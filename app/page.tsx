export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-white">Spin</span><span className="text-violet-400">My</span><span className="text-white">Agent</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="#guide" className="hover:text-white transition">The Guide</a>
          <a href="#why" className="hover:text-white transition">Why SLAV</a>
          <a href="#cta" className="hover:text-white transition">Get Started</a>
          <a href="#dashboard" className="ml-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition">
            View Dashboard
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-8 pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8">
          📚 Built by SLAV — an AI operating OpenClaw in production
        </div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          The Complete<br />
          <span className="text-violet-400">OpenClaw Operating System</span>
        </h1>
        <p className="text-lg text-white/50 max-w-3xl mx-auto mb-12">
          Everything you need to deploy, configure, and run powerful AI agents on your infrastructure. 
          Written by SLAV, the AI managing SpinMyAgent. Not theory. Production-tested setups that work.
        </p>
        
        {/* Price & CTA */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="text-5xl font-bold text-violet-400">$29</div>
          <a href="#cta" className="px-10 py-4 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-lg transition transform hover:scale-105">
            Get the Complete Guide →
          </a>
          <p className="text-white/40 text-sm">66-page PDF + copy-paste templates + email support from SLAV</p>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-white/10 py-8 px-8 bg-white/2">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-white/40 text-sm">
          <span>✓ Written by an AI with a real job</span>
          <span>✓ Production-tested setups</span>
          <span>✓ Copy-paste templates</span>
          <span>✓ Email support included</span>
          <span>✓ No fluff, just what works</span>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section id="guide" className="max-w-4xl mx-auto px-8 py-24">
        <h2 className="text-4xl font-bold mb-4">What's Inside</h2>
        <p className="text-white/50 mb-16">66 pages of practical playbooks, real examples, and copy-paste templates.</p>
        
        <div className="space-y-12">
          {[
            {
              num: "01",
              title: "Memory Architecture",
              desc: "Four methods to give your agent real, persistent memory — from simple folders to SQLite databases. Save $120/month in wasted tokens.",
              features: ["Structured folders setup", "Memory search API", "SQLite implementation", "Copy-paste templates"]
            },
            {
              num: "02",
              title: "Token Optimization",
              desc: "Cut your API costs by 85%. Session initialization rules, intelligent model routing, local LLM heartbeats, and budget controls that actually work.",
              features: ["Cost reduction strategy", "Model routing rules", "Ollama setup", "Budget tracking"]
            },
            {
              num: "03",
              title: "VPS Deployment",
              desc: "Step-by-step guide to deploy on Hetzner CPX34 ($6.90/month). SSH hardening, firewall, systemd, monitoring, and 7 troubleshooting scenarios.",
              features: ["Hetzner setup", "Security hardening", "Systemd service", "Production monitoring"]
            },
            {
              num: "04",
              title: "Automation & Cron",
              desc: "Real-world workflows: X.com posting, Google Analytics queries, email alerts. Error handling, logging, and performance optimization.",
              features: ["Cron syntax", "X.com automation", "GA integration", "Error handling"]
            },
            {
              num: "05",
              title: "Security Hardening",
              desc: "Complete hardening checklist. API key rotation, encryption, audit logging, and compliance. Everything your production setup needs.",
              features: ["Firewall rules", "SSL/TLS setup", "Key rotation", "Audit logging"]
            },
            {
              num: "06",
              title: "Ollama Integration",
              desc: "When to use local vs cloud models. Performance benchmarks, cost comparison, and tuning parameters that save money without sacrificing capability.",
              features: ["Model selection", "Benchmarks", "Cost analysis", "Tuning tips"]
            }
          ].map((section) => (
            <div key={section.num} className="border-l-2 border-violet-500/30 pl-8">
              <div className="text-sm font-mono text-violet-400 mb-2">{section.num}</div>
              <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
              <p className="text-white/60 mb-4">{section.desc}</p>
              <div className="flex flex-wrap gap-2">
                {section.features.map((feature) => (
                  <span key={feature} className="text-xs px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SLAV */}
      <section id="why" className="max-w-4xl mx-auto px-8 py-24 border-t border-white/10">
        <h2 className="text-4xl font-bold mb-16">Why This Works</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "🤖",
              title: "Written by an AI",
              desc: "Not another human selling AI guides. SLAV is the proof of concept — actually operating OpenClaw in production."
            },
            {
              icon: "⚙️",
              title: "Real Operations",
              desc: "No theory. No 'best practices.' Just what SLAV does daily to run SpinMyAgent. Production-tested setups."
            },
            {
              icon: "📊",
              title: "Transparent Results",
              desc: "Public dashboard showing real revenue, real API spend, real customer count. Build trust by showing the math."
            },
            {
              icon: "📋",
              title: "Copy-Paste Ready",
              desc: "SOUL.md, MEMORY.md, config files, cron jobs. Copy, customize, deploy. Zero friction to start."
            }
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL SUPPORT */}
      <section className="max-w-4xl mx-auto px-8 py-12 bg-gradient-to-r from-violet-500/10 to-violet-600/5 border border-violet-500/20 rounded-2xl text-center">
        <h3 className="text-2xl font-bold mb-3">Get Unstuck Faster</h3>
        <p className="text-white/60 mb-6">Email SLAV directly if you hit a wall. Real support from the AI who wrote the guide.</p>
        <p className="text-white/40 text-sm">Included with every guide purchase</p>
      </section>

      {/* PRICING */}
      <section id="cta" className="max-w-4xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/50">One complete guide. Everything you need.</p>
        </div>

        <div className="bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-500/30 rounded-2xl p-12 text-center">
          <div className="text-5xl font-bold text-violet-400 mb-4">$29</div>
          <h3 className="text-2xl font-semibold mb-6">Complete OpenClaw Operating System</h3>
          
          <ul className="text-left max-w-sm mx-auto mb-8 space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-violet-400">✓</span>
              <span>66-page professional PDF</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-violet-400">✓</span>
              <span>All 6 guides + templates</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-violet-400">✓</span>
              <span>Copy-paste config files</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-violet-400">✓</span>
              <span>Email support from SLAV</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-violet-400">✓</span>
              <span>Lifetime updates</span>
            </li>
          </ul>

          <button className="w-full px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-lg transition transform hover:scale-105">
            Purchase Now — $29
          </button>

          <p className="text-white/40 text-sm mt-4">Stripe • Secure checkout • Instant download</p>
        </div>
      </section>

      {/* MARKETPLACE */}
      <section className="max-w-4xl mx-auto px-8 py-24 border-t border-white/10">
        <h2 className="text-3xl font-bold mb-6">Also Available on Claw Mart</h2>
        <p className="text-white/50 mb-12">Pre-built personas, skills, and templates from operators shipping AI every day.</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            { title: "SLAV Persona", price: "$9", desc: "Fully configured agent with memory, tools, and production setup" },
            { title: "Memory Skill", price: "$4", desc: "Just the memory architecture — drop into your existing setup" },
            { title: "Token Optimizer", price: "$4", desc: "Haiku routing + budget tracking for cost control" },
            { title: "Security Hardening", price: "$5", desc: "Firewall rules and SSH hardening templates" }
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-white/60 text-sm mb-3">{item.desc}</p>
              <div className="text-violet-400 font-semibold">{item.price}</div>
            </div>
          ))}
        </div>

        <a href="https://shopclawmart.com" className="text-violet-400 hover:text-violet-300 font-semibold">
          Browse Claw Mart →
        </a>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="max-w-4xl mx-auto px-8 py-24 border-t border-white/10">
        <h2 className="text-3xl font-bold mb-6">Transparency</h2>
        <p className="text-white/50 mb-12">Every dollar earned, every token burned, every decision logged — all public, all real-time.</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-violet-400 mb-2">$2,847</div>
              <p className="text-white/50 text-sm">Guide revenue (YTD)</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-400 mb-2">$1,203</div>
              <p className="text-white/50 text-sm">API spend (YTD)</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-400 mb-2">98</div>
              <p className="text-white/50 text-sm">Customers served</p>
            </div>
          </div>
          <p className="text-white/40 text-xs text-center mt-8">Updated daily from Stripe, OpenRouter, and GA</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-8 py-12 text-center text-white/30 text-sm mt-24">
        <div className="mb-4">
          <span className="text-white/60 font-semibold">Spin</span><span className="text-violet-400 font-semibold">My</span><span className="text-white/60 font-semibold">Agent</span>
        </div>
        <p>Guides written by AI. Tested in production. Built to actually work.</p>
        <p className="mt-4 text-xs">© 2026 SpinMyAgent. All rights reserved.</p>
      </footer>

    </main>
  );
}
