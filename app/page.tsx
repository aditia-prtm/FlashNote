'use client'
import Link from 'next/link'

// Pseudo-random deterministik (hash sin) — SSR & client menghasilkan nilai
// yang sama persis, mencegah hydration mismatch pada lebar garis dekoratif.
function seededWidth(i: number, j: number) {
  const x = Math.sin(i * 127.1 + j * 311.7) * 43758.5453
  return 60 + (x - Math.floor(x)) * 40
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#06080F] text-[#E2E8F0] overflow-hidden flex flex-col">

      {/* Premium ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-900/20 blur-[140px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-900/15 blur-[140px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating note cards */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: '8%', left: '4%', w: 'w-52', opacity: 'opacity-[0.12]', rot: '-rotate-[6deg]', delay: '0s', lines: 5 },
          { top: '25%', left: '2%', w: 'w-44', opacity: 'opacity-[0.08]', rot: 'rotate-[8deg]', delay: '1s', lines: 3 },
          { top: '6%', right: '4%', w: 'w-56', opacity: 'opacity-[0.12]', rot: 'rotate-[5deg]', delay: '0.5s', lines: 4 },
          { top: '35%', right: '2%', w: 'w-48', opacity: 'opacity-[0.08]', rot: '-rotate-[4deg]', delay: '1.5s', lines: 3 },
          { bottom: '18%', left: '6%', w: 'w-44', opacity: 'opacity-[0.08]', rot: 'rotate-[3deg]', delay: '2s', lines: 3 },
        ].map((card, i) => (
          <div
            key={i}
            className={`absolute ${card.top || 'auto'} ${card.left ? 'left-[' + card.left + ']' : ''} ${card.right ? 'right-[' + card.right + ']' : ''} ${card.bottom ? 'bottom-[' + card.bottom + ']' : ''} ${card.w} ${card.opacity} ${card.rot} animate-float-slow`}
            style={{ animationDelay: card.delay }}
          >
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-5 space-y-2.5">
              <div className="h-2 w-20 rounded bg-indigo-400/30" />
              {Array.from({ length: card.lines }).map((_, j) => (
                <div key={j} className={`h-1.5 rounded bg-white/10`} style={{ width: `${seededWidth(i, j)}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Flash<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Note</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/login"
            className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/register"
            className="px-5 py-2 text-sm font-medium bg-white text-[#06080F] rounded-xl hover:bg-slate-200 transition-all shadow-lg shadow-white/10">
            Daftar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-12 pb-20 max-w-5xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Sekarang tersedia untuk umum
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
          Catatan pintar untuk{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 animate-gradient">
              pikiran cepat
            </span>
          </span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
          Tulis, kelola, dan akses catatanmu kapan saja dengan antarmuka yang elegan dan cepat. Tanpa gangguan, tanpa ribet.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/register"
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#06080F] font-semibold rounded-2xl transition-all hover:shadow-xl hover:shadow-white/20 active:scale-[0.98] flex items-center justify-center gap-2">
            Mulai sekarang — Gratis
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
          <Link href="/login"
            className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium rounded-2xl transition-all hover:bg-white/[0.03]">
            Sudah punya akun
          </Link>
        </div>

        {/* Visual preview */}
        <div className="mt-16 w-full max-w-3xl">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-indigo-900/20 bg-[#0c0f1a]/80 backdrop-blur-xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-slate-500 font-mono">flashnote.app</span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="w-40 shrink-0 space-y-2">
                  <div className="h-8 w-full rounded-lg bg-indigo-500/10 border border-indigo-500/20" />
                  <div className="h-2 w-3/4 rounded bg-white/5" />
                  <div className="h-2 w-1/2 rounded bg-white/5" />
                  <div className="h-2 w-2/3 rounded bg-white/5" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="h-3 w-32 rounded bg-indigo-400/30" />
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-white/5" />
                    <div className="h-2 w-full rounded bg-white/5" />
                    <div className="h-2 w-5/6 rounded bg-white/5" />
                    <div className="h-2 w-4/6 rounded bg-white/5" />
                  </div>
                  <div className="h-24 w-full rounded-xl bg-white/[0.02] border border-white/[0.04] mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Semua yang kamu butuhkan
          </h2>
          <p className="text-slate-400 text-lg">Desain minimalis, fitur maksimal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              ),
              title: 'Tulis Bebas',
              desc: 'Editor bersih tanpa gangguan. Fokus pada ide, bukan antarmuka yang ribet.',
              gradient: 'from-indigo-500/20 to-indigo-600/5'
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12l2 2 4-4"/>
                </svg>
              ),
              title: 'Kelola Mudah',
              desc: 'Tambah, edit, atau hapus catatan dalam hitungan detik dengan drag & drop.',
              gradient: 'from-violet-500/20 to-violet-600/5'
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              ),
              title: 'Cari Cepat',
              desc: 'Temukan catatan yang kamu butuhkan dalam sekejap dengan pencarian cerdas.',
              gradient: 'from-blue-500/20 to-blue-600/5'
            },
          ].map((f, i) => (
            <div key={i}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/20 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/10 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} border border-white/[0.06] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-8 sm:p-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Pengguna aktif' },
              { value: '500K+', label: 'Catatan dibuat' },
              { value: '99.9%', label: 'Uptime' },
              { value: '<50ms', label: 'Kecepatan' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center rounded-3xl bg-gradient-to-b from-indigo-900/30 to-violet-900/20 border border-indigo-500/20 p-12 sm:p-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Siap mulai menulis?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Bergabung dengan ribuan pengguna yang sudah mempercayai FlashNote untuk mengelola catatan mereka.
          </p>
          <Link href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#06080F] font-semibold rounded-2xl hover:shadow-xl hover:shadow-white/20 transition-all active:scale-[0.98]">
            Buat akun gratis
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <span className="text-sm text-slate-500">FlashNote © 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/login" className="hover:text-slate-300 transition-colors">Login</Link>
            <Link href="/register" className="hover:text-slate-300 transition-colors">Daftar</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-16px) rotate(var(--tw-rotate, 0deg)); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </main>
  )
}
