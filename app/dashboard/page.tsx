'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

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
  }

  function handleEdit(note: Note) {
    setEditId(note.id)
    setTitle(note.title)
    setContent(note.content ?? "")
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancel() {
    setEditId(null); setTitle(""); setContent("")
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    (n.content ?? "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F0F4FF]">

      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-violet-500/6 blur-[100px]" />
      </div>

      {/* Navbar */}
      <header className="z-20 sticky top-0 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/FlashNote.png" alt="FlashNote.png" className='w-8 h-8'/>
            <div>
              <span className="font-semibold text-[#F0F4FF] italic text-xl tracking-tight">
                Flash
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400'>
                  Note.
                </span>
              </span>
              <p className="text-[10px] md:text-[13px] text-[#4A5568] leading-none mt-0.5">{email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm md:text-md font-medium text-[#8892B0] hover:text-red-400 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 6h5M7.5 4l2 2-2 2M7 1.5H2.5a1 1 0 00-1 1v7a1 1 0 001 1H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Stats bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Catatan Saya</h1>
            <p className="text-xs md:text-sm text-[#4A5568] mt-0.5">{notes.length} catatan tersimpan</p>
          </div>
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]" width="15" height="15" viewBox="0 0 13 13" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari catatan..."
              className="bg-[#1E2440]/60 border border-white/8 focus:border-indigo-500/40 rounded-xl pl-8 pr-4 py-1.5 text-sm text-[#F0F4FF] placeholder-[#4A5568] outline-none transition-all w-44 focus:w-56 h-10"
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#1E2440]/60 border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 rounded-full bg-indigo-500" />
            <h2 className="text-md font-semibold text-[#A5B4FC]">
              {editId ? "Edit Catatan" : "Catatan Baru"}
            </h2>
          </div>

          <form onSubmit={handleSave} className="space-y-3">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Judul catatan..."
              required
              className="w-full bg-[#0A0F1E]/50 border border-white/8 hover:border-white/15 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-[#F0F4FF] placeholder-[#4A5568] outline-none transition-all"
            />
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Tulis catatanmu di sini..."
              rows={4}
              className="w-full bg-[#0A0F1E]/50 border border-white/8 hover:border-white/15 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-[#F0F4FF] placeholder-[#4A5568] outline-none transition-all resize-y"
            />
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                      <path d="M12 7a5 5 0 00-5-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Menyimpan...
                  </>
                ) : editId ? "Simpan Perubahan" : "Simpan Catatan"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2.5 border border-white/10 hover:border-white/20 text-[#8892B0] hover:text-[#F0F4FF] text-sm font-medium rounded-xl transition-all"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Notes list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-[#1E2440]/30 border border-dashed border-white/8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-[#1E2440] border border-white/8 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="2" width="14" height="16" rx="2" stroke="#4A5568" strokeWidth="1.5"/>
                <path d="M7 7h6M7 10h4" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[#4A5568] text-sm font-medium">
              {search ? "Tidak ada catatan yang cocok" : "Belum ada catatan"}
            </p>
            <p className="text-[#4A5568] text-xs mt-1 opacity-60">
              {search ? "Coba kata kunci lain" : "Mulai tulis catatan pertama kamu"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((note) => (
              <div
                key={note.id}
                className={`group bg-[#1E2440]/60 border rounded-2xl p-5 transition-all duration-200 hover:border-indigo-500/20 hover:bg-[#1E2440]/80 ${
                  editId === note.id ? 'border-indigo-500/30 bg-[#1E2440]/80' : 'border-white/5'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-md text-[#F0F4FF] leading-snug">
                      {note.title}
                    </h3>
                    {note.content && (
                      <p className="text-[#8892B0] text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">
                        {note.content}
                      </p>
                    )}
                    <p className="text-[10px] md:text-sm text-[#4A5568] mt-3">
                      {new Date(note.created_at).toLocaleDateString("id-ID", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(note)}
                      className="p-2 text-[#8892B0] hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <svg width="20" height="20" viewBox="0 0 13 13" fill="none">
                        <path d="M9 1.5l2.5 2.5-7 7H2V8.5l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {deleteConfirm === note.id ? (
                      <div className="flex flex-col items-center gap-1 bg-[#1E2440]/80 border border-indigo-500/20 rounded-lg px-3 py-2">
                        <span className="text-[13px] text-white font-bold">Hapus?</span>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => handleDelete(note.id)}
                            className="text-[12px] bg-red-600 text-red-200 hover:text-red-600 hover:bg-red-200 rounded-md font-medium px-3 py-1 cursor-pointer transition-colors"
                          >Ya</button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-[12px] text-gray-100 bg-gray-600 hover:bg-gray-100 hover:text-gray-600 rounded-md px-3 py-1 cursor-pointer transition-colors"
                          >Batal</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(note.id)}
                        className="p-2 text-[#8892B0] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Hapus"
                      >
                        <svg width="20" height="20" viewBox="0 0 13 13" fill="none">
                          <path d="M2 3.5h9M5 3.5V2.5h3v1M4 3.5l.5 7h4l.5-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}