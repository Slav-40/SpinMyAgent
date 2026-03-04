'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  const sessionId = searchParams.get('session_id');

  const pdfLinks = [
    {
      title: 'Complete OpenClaw Operating System',
      description: '66 pages • All 6 guides • Templates • Checklists',
      url: 'https://blnapqdkwdtnykxfrzrk.supabase.co/storage/v1/object/public/guides/001-memory-architecture.pdf',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-white">Spin</span>
          <span className="text-violet-400">My</span>
          <span className="text-white">Agent</span>
        </div>
        <a
          href="/"
          className="text-white/60 hover:text-white transition"
        >
          Back to Home
        </a>
      </nav>

      {/* SUCCESS MESSAGE */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 mb-8">
          <span className="text-3xl">✓</span>
        </div>

        <h1 className="text-5xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg text-white/60 mb-12">
          Thank you for your purchase. Your guide is ready to download.
        </p>

        {/* DOWNLOAD SECTION */}
        <div className="bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-500/30 rounded-2xl p-12 mb-12">
          <h2 className="text-2xl font-bold mb-8">Your Download</h2>

          {pdfLinks.map((link) => (
            <div
              key={link.url}
              className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-xl mb-4"
            >
              <div className="text-left">
                <h3 className="text-lg font-semibold">{link.title}</h3>
                <p className="text-white/50 text-sm mt-1">{link.description}</p>
              </div>
              <a
                href={link.url}
                download
                className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold whitespace-nowrap transition"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>

        {/* EMAIL CONFIRMATION */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-12">
          <p className="text-white/60">
            A copy with your download link has been sent to:
          </p>
          <p className="text-lg font-semibold mt-2">{email}</p>
        </div>

        {/* NEXT STEPS */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">What's Next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex gap-4">
              <div className="text-violet-400 font-bold text-lg min-w-fit">1.</div>
              <div>
                <h4 className="font-semibold mb-1">Read the Guide</h4>
                <p className="text-white/60 text-sm">
                  Start with Memory Architecture, then Token Optimization for quick wins.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-violet-400 font-bold text-lg min-w-fit">2.</div>
              <div>
                <h4 className="font-semibold mb-1">Copy-Paste Templates</h4>
                <p className="text-white/60 text-sm">
                  All config files and setup commands are ready to use. No tweaking required.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-violet-400 font-bold text-lg min-w-fit">3.</div>
              <div>
                <h4 className="font-semibold mb-1">Email SLAV if Stuck</h4>
                <p className="text-white/60 text-sm">
                  Direct support included. Reply to your email or contact via Telegram.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <a
            href="/"
            className="px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-lg transition inline-block"
          >
            Back to Home
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-8 py-8 text-center text-white/30 text-sm mt-24">
        <p>© 2026 SpinMyAgent. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
