'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#06080F] flex relative overflow-hidden">

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-[#06080F] to-violet-900/30" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full bg-indigo-500/10 blur-[80px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-violet-500/10 blur-[60px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-md">
          <Link 
            className="flex items-center gap-3 mb-8 cursor-pointer"
            href="/"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <span className="font-bold text-2xl text-white">
              Flash<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Note</span>
            </span>
          </Link>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Tempat semua ide Anda,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              tertata rapi
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Catatan yang responsif, cepat, dan elegan. Dirancang untuk meningkatkan produktivitas Anda.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              'Editor yang bersih dan tanpa gangguan',
              'Sinkronisasi real-time di semua perangkat',
              'Pencarian instan untuk catatan Anda'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </div>
                <span className="text-slate-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
        {/* Ambient glow */}
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-violet-600/8 blur-[80px]" />

        <div className="relative z-10 w-full max-w-md">

          {/* Mobile logo */}
          <Link 
            className="lg:hidden flex items-center gap-2 mb-8 cursor-pointer"
            href="/"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <span className="font-bold text-xl text-white">
              Flash<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Note</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Selamat datang kembali</h1>
            <p className="text-slate-400">Masuk untuk melanjutkan catatanmu</p>
          </div>

          {/* Glassmorphism card */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-black/20">

            {error && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 mb-6">
                <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="kamu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.15] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.15] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 pr-11 text-white placeholder-slate-500 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded bg-white/[0.05] border-white/[0.15] text-indigo-500 focus:ring-indigo-500/20 focus:ring-offset-0" />
                  <span className="text-slate-400">Ingat saya</span>
                </label>
                <Link href="/forgot-password" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                  Lupa password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-600/25 active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.3" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Login...
                  </span>
                ) : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.08]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-slate-500">atau lanjutkan dengan</span>
              </div>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.15] rounded-xl transition-all hover:bg-white/[0.08]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M5.26620003,9.76452941 C6.77873459,6.31837622 10.2550087,3.81991667 14.5113748,3.81991667 C17.3973247,3.81991667 19.9041736,5.02489053 21.7840343,7.00367997 L18.4890377,10.1489056 C17.3520217,8.78594475 15.7654388,7.97460761 14.5113748,7.97460761 C12.3148298,7.97460761 10.4389354,9.27002155 9.47776528,11.2393295 L5.26620003,9.76452941 Z"/>
                  <path fill="#34A853" d="M14.5113748,23.1800833 C10.2550087,23.1800833 6.77873459,20.6816238 5.26620003,17.2354706 L9.47776528,15.7606705 C10.4952146,17.6918985 12.3434327,18.024393 14.5113748,18.024393 C16.0751086,18.024393 17.4840301,17.4233735 18.506104,16.3682896 L21.7840343,19.0710734 C19.9261663,21.5380397 17.4304003,23.1800833 14.5113748,23.1800833 Z"/>
                  <path fill="#4A90E2" d="M21.7840343,7.00367997 C21.7840343,7.36390795 21.7304098,7.71336823 21.6291511,8.04718972 L14.5113748,14.1342329 C13.8201102,13.6217858 13.0479469,13.3477393 12.2151629,13.3477393 C11.3636388,13.3477393 10.5764924,13.636368 9.88472866,14.1769228 L5.26620003,12.2354706 C6.39312845,9.59634228 8.93756987,7.97460761 12.2151629,7.97460761 C13.5909494,7.97460761 14.8773124,8.35833221 15.9664764,9.0495187 L21.7840343,7.00367997 Z"/>
                  <path fill="#FBBC05" d="M5.26620003,9.76452941 L9.47776528,11.2393295 C10.4389354,9.27002155 12.3148298,7.97460761 14.5113748,7.97460761 C15.0470022,7.97460761 15.5668157,8.08535164 16.0466331,8.29008997 L18.4890377,10.1489056 C17.3520217,8.78594475 15.7654388,7.97460761 14.5113748,7.97460761 C12.3434327,7.97460761 10.4952146,8.28579823 9.47776528,10.2166705 L5.26620003,9.76452941 Z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.15] rounded-xl transition-all hover:bg-white/[0.08]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun?{' '}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
