import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0F1E] text-[#F0F4FF] overflow-hidden flex flex-col">

      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-indigo-400/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-violet-500/8 blur-[80px]" />
      </div>

      {/* Floating note cards — signature element */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Card 1 */}
        <div className="absolute top-[12%] left-[6%] w-44 opacity-20 rotate-[-8deg] animate-float-slow">
          <div className="rounded-xl bg-[#1E2440] border border-indigo-500/20 p-4 space-y-2">
            <div className="h-2 w-16 rounded bg-indigo-400/40" />
            <div className="h-1.5 w-24 rounded bg-white/20" />
            <div className="h-1.5 w-20 rounded bg-white/20" />
            <div className="h-1.5 w-14 rounded bg-white/20" />
          </div>
        </div>
        {/* Card 2 */}
        <div className="absolute top-[30%] left-[2%] w-36 opacity-15 rotate-[6deg] animate-float-medium">
          <div className="rounded-xl bg-[#1E2440] border border-indigo-500/20 p-3 space-y-2">
            <div className="h-2 w-12 rounded bg-indigo-400/40" />
            <div className="h-1.5 w-20 rounded bg-white/20" />
            <div className="h-1.5 w-16 rounded bg-white/20" />
          </div>
        </div>
        {/* Card 3 */}
        <div className="absolute top-[8%] right-[5%] w-48 opacity-20 rotate-[7deg] animate-float-medium">
          <div className="rounded-xl bg-[#1E2440] border border-indigo-500/20 p-4 space-y-2">
            <div className="h-2 w-20 rounded bg-indigo-400/40" />
            <div className="h-1.5 w-28 rounded bg-white/20" />
            <div className="h-1.5 w-24 rounded bg-white/20" />
            <div className="h-1.5 w-16 rounded bg-white/20" />
            <div className="h-1.5 w-20 rounded bg-white/20" />
          </div>
        </div>
        {/* Card 4 */}
        <div className="absolute top-[40%] right-[3%] w-40 opacity-15 rotate-[-5deg] animate-float-slow">
          <div className="rounded-xl bg-[#1E2440] border border-indigo-500/20 p-3 space-y-2">
            <div className="h-2 w-14 rounded bg-indigo-400/40" />
            <div className="h-1.5 w-22 rounded bg-white/20" />
            <div className="h-1.5 w-18 rounded bg-white/20" />
          </div>
        </div>
        {/* Card 5 */}
        <div className="absolute bottom-[20%] left-[8%] w-40 opacity-15 rotate-[4deg] animate-float-medium">
          <div className="rounded-xl bg-[#1E2440] border border-indigo-500/20 p-3 space-y-2">
            <div className="h-2 w-16 rounded bg-indigo-400/40" />
            <div className="h-1.5 w-20 rounded bg-white/20" />
            <div className="h-1.5 w-12 rounded bg-white/20" />
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-6xl mx-auto w-full">
        <div className='flex items-center gap-2'>
          <img src="/FlashNote.png" alt="FlashNote.png" className='w-8 h-8'/>
          <span className="font-semibold text-[#F0F4FF] italic text-xl tracking-tight">
            Flash
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400'>
              Note
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login"
            className="px-4 py-1.5 text-sm text-[#A5B4FC] hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/register"
            className="px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 py-20 max-w-3xl mx-auto">

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Semua catatan kamu,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            di satu tempat
          </span>
        </h1>

        <p className="text-[#8892B0] text-lg leading-relaxed max-w-xl mb-10">
          Aplikasi catatan minimalis yang tidak menghalangi proses berpikir kamu.
          Tulis, kelola, dan akses catatanmu kapan saja.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link href="/register"
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-600/25 active:scale-95">
            Buat catatan pertama
          </Link>
          <Link href="/login"
            className="w-full sm:w-auto px-8 py-3 border border-white/10 hover:border-white/20 text-[#A5B4FC] hover:text-white font-medium rounded-xl transition-all">
            Sudah punya akun →
          </Link>
        </div>
      </section>

      {/* Feature strip */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 5h12M3 9h8M3 13h10" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Tulis bebas',
              desc: 'Editor bersih tanpa gangguan. Fokus pada ide, bukan antarmuka.',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="14" height="14" rx="3" stroke="#6366F1" strokeWidth="1.5"/>
                  <path d="M6 9l2.5 2.5L12 6" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Kelola mudah',
              desc: 'Tambah, edit, atau hapus catatan dalam hitungan detik.',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="5" stroke="#6366F1" strokeWidth="1.5"/>
                  <path d="M12 12l3 3" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Cari cepat',
              desc: 'Temukan catatan yang kamu butuhkan tanpa perlu scroll panjang.',
            },
          ].map((f) => (
            <div key={f.title}
              className="group rounded-2xl bg-[#1E2440]/60 border border-white/5 hover:border-indigo-500/20 p-5 transition-all">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                {f.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-[#8892B0] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-5 text-center text-xs text-[#4A5568]">
        FlashNote - 2026
      </footer>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-14px) rotate(var(--tw-rotate)); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-9px) rotate(var(--tw-rotate)); }
        }
        .animate-float-slow {
          animation: float-slow 7s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </main>
  )
}