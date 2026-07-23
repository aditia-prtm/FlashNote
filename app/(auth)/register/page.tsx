'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if(!email || !password) return
    setLoading(true); setError("")
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[100px]" />
      </div>

      <div className="relative z-10 w-2/5 min-w-[468px]">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <img src="/FlashNote.png" alt="FlashNote.png" className='w-8 h-8'/>
            <span className="font-semibold text-[#F0F4FF] italic text-3xl tracking-tight">
              Flash
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400'>
                Note.
              </span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-[#F0F4FF] tracking-tight">Mulai buat catatan</h1>
          <p className="text-sm md:text-md text-[#8892B0] mt-1">Daftar sekarang dan buat catatan pertamamu</p>
        </div>

        {/* Card */}
        <div className="bg-[#1E2440]/60 border border-white/5 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-3.5 py-3">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#F87171" strokeWidth="1.5"/>
                  <path d="M7 4.5V7.5" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="7" cy="9.5" r="0.75" fill="#F87171"/>
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm md:text-md font-medium text-[#A5B4FC] tracking-wide">Email</label>
              <input
                type="email"
                placeholder="kamu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full mt-1 bg-[#0A0F1E]/60 border border-white/8 hover:border-white/15 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-2.5 text-sm md:text-md text-[#F0F4FF] placeholder-[#4A5568] outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm md:text-md font-medium text-[#A5B4FC] tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full mt-1 bg-[#0A0F1E]/60 border border-white/8 hover:border-white/15 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-2.5 pr-10 text-sm md:text-md text-[#F0F4FF] placeholder-[#4A5568] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568] hover:text-[#8892B0] transition-colors"
                  tabIndex={-1}
                >
                  {/* icon password */}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm md:text-md font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M14 8a6 6 0 00-6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Register...
                </span>
              ) : "Register"}
            </button>

          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-[#4A5568] mt-5">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}