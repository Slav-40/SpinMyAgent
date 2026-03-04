import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentCraft — Build AI Agents That Run Themselves",
  description: "Step-by-step guides to set up, configure, and deploy powerful OpenClaw AI agents on any platform. Local, VPS, or cloud.",
  keywords: ["OpenClaw", "AI agent", "Telegram bot", "VPS setup", "AI automation", "self-hosted AI"],
  openGraph: {
    title: "AgentCraft — Build AI Agents That Run Themselves",
    description: "Step-by-step guides for OpenClaw AI agent setup. Local, VPS, and advanced configurations.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
