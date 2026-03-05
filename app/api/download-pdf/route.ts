import { NextRequest, NextResponse } from 'next/server';

// Force Node.js runtime
export const runtime = 'nodejs';

// Whitelist of allowed PDF filenames (security: prevent open redirect/SSRF)
const ALLOWED_FILES: Record<string, string> = {
  'complete-openclaw-os.pdf': 'complete-openclaw-os.pdf',
  '001-memory-architecture.pdf': '001-memory-architecture.pdf',
  '002-token-optimization.pdf': '002-token-optimization.pdf',
};

const SUPABASE_STORAGE_BASE = 'https://blnapqdkwdtnykxfrznk.supabase.co/storage/v1/object/public/guides';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  // Validate file parameter
  if (!file || !ALLOWED_FILES[file]) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
  }

  const supabaseUrl = `${SUPABASE_STORAGE_BASE}/${encodeURIComponent(file)}`;

  try {
    const response = await fetch(supabaseUrl, {
      headers: {
        'User-Agent': 'SpinMyAgent/1.0',
      },
    });

    if (!response.ok) {
      console.error(`[Download] Supabase fetch failed: ${response.status} for ${file}`);
      return NextResponse.json(
        { error: 'File not available' },
        { status: response.status }
      );
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (err) {
    console.error('[Download] Error fetching PDF:', err);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
