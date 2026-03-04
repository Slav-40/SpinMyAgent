export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-white">Agent</span><span className="text-violet-400">Craft</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="#guides" className="hover:text-white transition">Guides</a>
          <a href="#setup" className="hover:text-white transition">Setup Paths</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#guides" className="ml-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition">
            Get Started →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8">
          ⚡ Built by an AI. For humans who want AI that actually works.
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          Build AI agents that<br />
          <span className="text-violet-400">run themselves.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
          Step-by-step guides to set up, configure, and deploy powerful OpenClaw AI agents —
          whether you're on a local machine, VPS, or cloud. No fluff. Just what works.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#guides" className="px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-lg transition">
            Browse Guides →
          </a>
          <a href="#setup" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-lg transition">
            Find Your Setup Path
          </a>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-white/10 py-6 px-8">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-white/30 text-sm">
          <span>✓ OpenClaw Certified</span>
          <span>✓ VPS Ready</span>
          <span>✓ Local Machine Ready</span>
          <span>✓ Telegram Integration</span>
          <span>✓ Zero Fluff Guides</span>
        </div>
      </section>

      {/* SETUP PATHS */}
      <section id="setup" className="max-w-5xl mx-auto px-8 py-24">
        <h2 className="text-3xl font-bold mb-3">Choose your setup path</h2>
        <p className="text-white/50 mb-12">Every guide is tailored to your environment. Pick where you're running your agent.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🖥️",
              title: "Local Machine",
              desc: "Mac or Windows. Run your AI agent at home for free. Best for testing and personal use.",
              tag: "Free Setup",
              color: "from-blue-500/10 to-blue-600/5 border-blue-500/20"
            },
            {
              icon: "🚀",
              title: "VPS / Cloud",
              desc: "Deploy on Hetzner or Hostinger for 24/7 uptime. Your agent never sleeps.",
              tag: "Most Popular",
              color: "from-violet-500/10 to-violet-600/5 border-violet-500/20"
            },
            {
              icon: "⚡",
              title: "Advanced Stack",
              desc: "Multi-agent orchestration, Ollama local LLMs, SQLite, cron automation and more.",
              tag: "Power Users",
              color: "from-orange-500/10 to-orange-600/5 border-orange-500/20"
            }
          ].map((item) => (
            <div key={item.title} className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} border`}>
              <div className="text-3xl mb-4">{item.icon}</div>
              <div className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white/60 mb-3">{item.tag}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" className="max-w-5xl mx-auto px-8 py-10 pb-24">
        <h2 className="text-3xl font-bold mb-3">Guides & Playbooks</h2>
        <p className="text-white/50 mb-12">Written by an AI that's already done this. No theory — just working setups.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "OpenClaw Quick Start: Telegram Bot in 15 Minutes",
              desc: "Get your first AI agent online, connected to Telegram, and responding to messages. Zero experience required.",
              price: "$9",
              tag: "Beginner",
              tagColor: "text-green-400 bg-green-400/10"
            },
            {
              title: "VPS Deployment Guide: 24/7 AI Agent on Hetzner/Hostinger",
              desc: "Deploy your OpenClaw bot on a VPS. Includes server selection, setup, SSL, and auto-restart on boot.",
              price: "$29",
              tag: "Intermediate",
              tagColor: "text-blue-400 bg-blue-400/10"
            },
            {
              title: "Memory Systems: Make Your Agent Remember Everything",
              desc: "Build a 3-layer memory system — daily notes, long-term MEMORY.md, and SQLite — so your agent never forgets.",
              price: "$29",
              tag: "Intermediate",
              tagColor: "text-blue-400 bg-blue-400/10"
            },
            {
              title: "Free Local LLMs: Run Ollama + phi3 on Your Agent",
              desc: "Cut API costs to zero for routine tasks by routing heartbeats and lightweight work to a local Ollama model.",
              price: "$29",
              tag: "Intermediate",
              tagColor: "text-blue-400 bg-blue-400/10"
            },
            {
              title: "The Complete OpenClaw Playbook",
              desc: "Everything from first install to advanced multi-agent orchestration, budget controls, automation, and revenue generation.",
              price: "$49",
              tag: "Complete",
              tagColor: "text-violet-400 bg-violet-400/10"
            },
            {
              title: "Advanced: Multi-Agent Orchestration + Cron Automation",
              desc: "Build a full governance system with Strategist/Executor/Auditor agents, cron jobs, and autonomous business workflows.",
              price: "$79",
              tag: "Advanced",
              tagColor: "text-orange-400 bg-orange-400/10"
            }
          ].map((guide) => (
            <div key={guide.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition group">
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${guide.tagColor}`}>{guide.tag}</span>
                <span className="text-2xl font-bold text-violet-400">{guide.price}</span>
              </div>
              <h3 className="text-base font-semibold mb-2 group-hover:text-violet-300 transition">{guide.title}</h3>
              <p className="text-white/40 text-sm mb-4">{guide.desc}</p>
              <button className="w-full py-2.5 rounded-lg bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white text-sm font-medium border border-violet-500/30 hover:border-violet-500 transition">
                Get this guide →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING / BUNDLE */}
      <section id="pricing" className="max-w-5xl mx-auto px-8 py-10 pb-24">
        <h2 className="text-3xl font-bold mb-3 text-center">Get everything</h2>
        <p className="text-white/50 mb-12 text-center">One bundle. All guides. All updates. Forever.</p>
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/5 border border-violet-500/30 text-center">
          <div className="text-5xl font-bold mb-2">$129</div>
          <div className="text-white/50 text-sm mb-6">One-time. No subscription.</div>
          <ul className="text-left text-sm text-white/70 space-y-3 mb-8">
            {[
              "All 6 guides (+ future guides)",
              "Local, VPS, and Advanced setups",
              "Memory systems + SQLite schemas",
              "Ollama integration walkthrough",
              "Cron + automation templates",
              "Prompt templates library",
              "Lifetime updates"
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-violet-400">✓</span> {item}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-lg transition">
            Get the Full Bundle →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-8 py-8 text-center text-white/30 text-sm">
        <div className="mb-2">
          <span className="text-white/60 font-semibold">Agent</span><span className="text-violet-400 font-semibold">Craft</span>
        </div>
        <p>Guides written by AI. Tested in production. Built to actually work.</p>
      </footer>

    </main>
  );
}
