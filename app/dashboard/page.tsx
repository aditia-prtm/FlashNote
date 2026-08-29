'use client'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, FileText, Home, LogOut, NotebookPen, Pencil, Search, Trash2, X } from 'lucide-react'

type Note = {
  id: string
  title: string
  content: string | null
  created_at: string
}

export default function DashboardPage() {
  const supabase = createClient()
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [email, setEmail] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editId, setEditId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/login"); return }
      setEmail(user.email ?? "")
      const { data } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false })
      setNotes(data ?? [])
    }
    load()
  }, [])

  // Klik di luar card → tutup menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!activeCard) return
      const activeEl = cardRefs.current[activeCard]
      if (activeEl && !activeEl.contains(e.target as Node)) {
        setActiveCard(null)
        setDeleteConfirm(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeCard])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (editId) {
      const { data } = await supabase
        .from("notes").update({ title, content }).eq("id", editId).select().single()
      setNotes(prev => prev.map(n => n.id === editId ? data! : n))
      setEditId(null)
    } else {
      const { data } = await supabase
        .from("notes").insert({ title, content, user_id: user.id }).select().single()
      setNotes(prev => [data!, ...prev])
    }
    setTitle(""); setContent("")
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await supabase.from("notes").delete().eq("id", id)
    setNotes(prev => prev.filter(n => n.id !== id))
    setDeleteConfirm(null)
    setActiveCard(null)
  }

  function handleEdit(note: Note) {
    setEditId(note.id)
    setTitle(note.title)
    setContent(note.content ?? "")
    setActiveCard(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancel() {
    setEditId(null); setTitle(""); setContent("")
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  function handleCardClick(noteId: string) {
    if (deleteConfirm) { setDeleteConfirm(null); return }
    setActiveCard(prev => prev === noteId ? null : noteId)
  }

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    (n.content ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const totalWords = notes.reduce(
    (acc, n) => acc + `${n.title} ${n.content ?? ""}`.trim().split(/\s+/).filter(Boolean).length,
    0
  )
  const now = new Date()
  const thisMonthCount = notes.filter(n => {
    const d = new Date(n.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="relative min-h-screen bg-[#06080F] text-[#E2E8F0]">

      {/* Ambient background — konsisten dengan landing & auth */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-900/20 blur-[140px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-900/15 blur-[140px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-[#06080F]/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xl tracking-tight text-white leading-none block">
                Flash<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Note</span>
              </span>
              <p className="text-[11px] md:text-xs text-slate-500 leading-none mt-1 truncate">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link href="/"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.15] rounded-xl transition-all active:scale-[0.98]"
            >
              <Home size={15} />
              Beranda
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.1] hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 rounded-xl transition-all active:scale-[0.98]"
            >
              <LogOut size={15} />
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Catatan Saya</h1>
            <p className="text-sm md:text-base text-slate-400 mt-1">Kelola semua ide dan catatanmu di satu tempat.</p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari catatan..."
              className="w-full bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.15] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Stats — konsisten dengan landing page */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: String(notes.length), label: "Total Catatan" },
            { value: String(totalWords), label: "Total Kata" },
            { value: String(thisMonthCount), label: "Bulan Ini" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl px-3 py-4 text-center backdrop-blur-sm"
            >
              <div className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                {stat.value}
              </div>
              <div className="text-slate-500 text-[11px] md:text-sm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Editor card — glassmorphism ala auth */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                {editId ? <Pencil size={16} className="text-indigo-400" /> : <NotebookPen size={16} className="text-indigo-400" />}
              </div>
              <div>
                <h2 className="font-semibold text-white leading-tight">
                  {editId ? "Edit Catatan" : "Catatan Baru"}
                </h2>
                <p className="text-xs text-slate-500">
                  {editId ? "Perbarui catatan yang sudah ada" : "Tuliskan ide sebelum terlupakan"}
                </p>
              </div>
            </div>
            {editId && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Mode Edit
                <button
                  type="button"
                  onClick={handleCancel}
                  className="ml-0.5 text-indigo-400 hover:text-indigo-200 transition-colors"
                  title="Batalkan edit"
                >
                  <X size={13} />
                </button>
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Judul catatan..."
              required
              className="w-full bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.15] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm md:text-base text-white placeholder-slate-500 outline-none transition-all font-medium"
            />
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Tulis catatanmu di sini..."
              rows={4}
              className="w-full bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.15] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm md:text-base text-white placeholder-slate-500 outline-none transition-all resize-y leading-relaxed"
            />
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-600/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.3" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Menyimpan...
                  </>
                ) : editId ? "Simpan Perubahan" : "Simpan Catatan"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-3 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.15] text-slate-300 text-sm font-medium rounded-xl transition-all active:scale-[0.98]"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Notes list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] border border-dashed border-white/[0.1] rounded-3xl">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
              <FileText size={22} className="text-slate-500" />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              {search ? "Tidak ada catatan yang cocok" : "Belum ada catatan"}
            </p>
            <p className="text-slate-500 text-xs mt-1">
              {search ? "Coba kata kunci lain" : "Mulai tulis catatan pertama kamu di atas"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((note) => {
              const isActive = activeCard === note.id
              return (
                <div
                  key={note.id}
                  ref={el => { cardRefs.current[note.id] = el }}
                  onClick={() => handleCardClick(note.id)}
                  className={`group border backdrop-blur-sm rounded-2xl p-5 md:p-6 transition-all duration-200 cursor-pointer select-none
                    ${editId === note.id || isActive
                      ? 'border-indigo-500/40 bg-white/[0.06] hover:border-indigo-500/40 hover:bg-white/[0.06]'
                      : 'border-white/[0.08] bg-white/[0.03] hover:border-indigo-500/25 hover:bg-white/[0.05]'}
                  `}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm md:text-base text-white leading-snug">
                        {note.title}
                      </h3>
                      {note.content && (
                        <p className="text-slate-400 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">
                          {note.content}
                        </p>
                      )}
                      <p className="flex items-center gap-1.5 text-[11px] md:text-xs text-slate-500 mt-3">
                        <Calendar size={12} />
                        {new Date(note.created_at).toLocaleDateString("id-ID", {
                          day: "numeric", month: "long", year: "numeric"
                        })}
                      </p>
                    </div>

                    {/* Action buttons: hover (desktop) OR tap (mobile) */}
                    <div
                      onClick={e => e.stopPropagation()}
                      className={`flex gap-2 shrink-0 transition-opacity duration-200
                        ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                      `}
                    >
                      <button
                        onClick={() => handleEdit(note)}
                        className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      {deleteConfirm === note.id ? (
                        <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-xl px-2.5 py-1.5">
                          <span className="text-xs text-red-400 font-semibold whitespace-nowrap">Hapus?</span>
                          <button
                            onClick={() => handleDelete(note.id)}
                            className="text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-red-200 rounded-lg font-medium px-2.5 py-1 cursor-pointer transition-colors"
                          >Ya</button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-xs text-slate-400 hover:text-slate-200 rounded-lg font-medium px-2.5 py-1 cursor-pointer transition-colors"
                          >Batal</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(note.id)}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <footer className="pt-6 pb-2 text-center">
          <p className="text-xs text-slate-600">FlashNote © 2026 — Catat lebih cepat, hidup lebih rapi.</p>
        </footer>
      </main>
    </div>
  )
}