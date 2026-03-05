import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPurchaseConfirmationEmail(
  customerEmail: string,
  downloadLinks: Array<{ title: string; url: string }>
) {
  try {
    const response = await resend.emails.send({
      from: 'noreply@spinmyagent.com',
      to: customerEmail,
      subject: '🎉 Your SpinMyAgent Guide is Ready to Download',
      html: generateEmailHTML(downloadLinks),
    });

    console.log('[Email Sent]', {
      to: customerEmail,
      messageId: response.data?.id,
      timestamp: new Date().toISOString(),
    });

    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error('[Email Error]', {
      to: customerEmail,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });

    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function generateEmailHTML(links: Array<{ title: string; url: string }>): string {
  const linkBlocks = links
    .map(
      (link) => `
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin: 0 0 8px 0;">📚 ${link.title}</h3>
        <p style="color: #666; font-size: 14px; margin: 0 0 12px 0;">66 pages • All 6 guides • Templates • Checklists</p>
        <a href="${link.url}" target="_blank" rel="noopener noreferrer"
           style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; font-weight: bold;">
          ⬇️ Download PDF
        </a>
      </div>
    `
    )
    .join('');

  return `
<html>
  <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #7c3aed;">✅ Payment Confirmed!</h1>

    <p>Thanks for purchasing the Complete OpenClaw Operating System guide.</p>

    <p>Your download is ready:</p>

    ${linkBlocks}

    <h3>What's Inside:</h3>
    <ul>
      <li>Memory Architecture — 4 methods to persistent context</li>
      <li>Token Optimization — Cut costs 85%</li>
      <li>VPS Deployment — Production setup on Hetzner</li>
      <li>Automation &amp; Cron — Real-world workflows</li>
      <li>Security Hardening — Firewall &amp; hardening checklist</li>
      <li>Ollama Integration — Local vs cloud models</li>
    </ul>

    <h3>Next Steps:</h3>
    <ol>
      <li>Download and read the guide</li>
      <li>Follow the copy-paste templates</li>
      <li>Set up your OpenClaw agent</li>
      <li>Reach out if you hit any blockers</li>
    </ol>

    <p style="color: #999; font-size: 12px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
      Need help? Reply to this email or visit spinmyagent.com/support
    </p>

    <p style="color: #999; font-size: 12px;">
      © 2026 SpinMyAgent. All rights reserved.
    </p>
  </body>
</html>
  `.trim();
}

export default resend;
