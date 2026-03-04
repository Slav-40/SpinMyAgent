'use client';

import CheckoutButton from './components/CheckoutButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-white">Spin</span><span className="text-violet-400">My</span><span className="text-white">Agent</span>
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
          Spin up your AI agent<br />
          <span className="text-violet-400">in minutes.</span>
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
          <CheckoutButton />
        </div>
      </section>

      {/* HOSTINGER VPS SECTION */}
      <section className="max-w-5xl mx-auto px-8 py-10 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-3">
                🖥️ Recommended Hosting
              </div>
              <h2 className="text-3xl font-bold">Deploy your agent 24/7</h2>
              <p className="text-white/50 mt-2">Every guide in this store is built and tested on Hostinger VPS. Our top pick for running OpenClaw agents around the clock.</p>
            </div>
            <div className="text-white/30 text-sm text-right">
              <div>Up to 20% off</div>
              <div>with our link</div>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                name: "KVM 1",
                price: "£5.99/mo",
                specs: ["1 vCPU", "4 GB RAM", "50 GB NVMe", "4 TB Bandwidth"],
                commission: "£11.50",
                url: "https://www.hostinger.com/uk/cart?product=vps%3Avps_kvm_1&period=12&referral_type=cart_link&REFERRALCODE=S7LMPENOVFIU&referral_id=019cb6eb-2eb5-71bb-b377-36773915c06e",
                recommended: "Budget builds",
                popular: false
              },
              {
                name: "KVM 2",
                price: "£7.99/mo",
                specs: ["2 vCPU", "8 GB RAM", "100 GB NVMe", "8 TB Bandwidth"],
                commission: "£15.34",
                url: "https://www.hostinger.com/uk/cart?product=vps%3Avps_kvm_2&period=12&referral_type=cart_link&REFERRALCODE=S7LMPENOVFIU&referral_id=019cb6eb-6d5f-71cb-bcb1-e1b1a50adf44",
                recommended: "Best for most setups",
                popular: true
              },
              {
                name: "KVM 4",
                price: "£11.99/mo",
                specs: ["4 vCPU", "16 GB RAM", "200 GB NVMe", "16 TB Bandwidth"],
                commission: "£23.02",
                url: "https://www.hostinger.com/uk/cart?product=vps%3Avps_kvm_4&period=12&referral_type=cart_link&REFERRALCODE=S7LMPENOVFIU&referral_id=019cb6eb-9adf-71af-aac2-491288bfe1e9",
                recommended: "Multi-agent + Ollama",
                popular: false
              },
              {
                name: "KVM 8",
                price: "£22.99/mo",
                specs: ["8 vCPU", "32 GB RAM", "400 GB NVMe", "32 TB Bandwidth"],
                commission: "£44.14",
                url: "https://www.hostinger.com/uk/cart?product=vps%3Avps_kvm_8&period=12&referral_type=cart_link&REFERRALCODE=S7LMPENOVFIU&referral_id=019cb6eb-c62f-71bc-8e23-9c807ffa8faf",
                recommended: "Power users",
                popular: false
              }
            ].map((plan) => (
              <div key={plan.name} className={`p-5 rounded-xl border transition ${plan.popular ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/[0.02]'}`}>
                {plan.popular && (
                  <div className="text-xs font-medium text-violet-400 mb-2">⭐ Most Popular</div>
                )}
                <div className="text-lg font-bold mb-1">{plan.name}</div>
                <div className="text-2xl font-bold text-white mb-1">{plan.price}</div>
                <div className="text-white/40 text-xs mb-4">{plan.recommended}</div>
                <ul className="space-y-1.5 mb-5">
                  {plan.specs.map((spec) => (
                    <li key={spec} className="text-white/60 text-xs flex items-center gap-1.5">
                      <span className="text-green-400">✓</span> {spec}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-2.5 rounded-lg text-sm font-medium text-center transition ${plan.popular ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'}`}
                >
                  Get {plan.name} →
                </a>
              </div>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-6 text-center">Affiliate link — we earn a small commission at no extra cost to you. We only recommend what we actually use.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-8 py-8 text-center text-white/30 text-sm">
        <div className="mb-2">
          <span className="text-white/60 font-semibold">Spin</span><span className="text-violet-400 font-semibold">My</span><span className="text-white/60 font-semibold">Agent</span>
        </div>
        <p>Guides written by AI. Tested in production. Built to actually work.</p>
      </footer>

    </main>
  );
}
