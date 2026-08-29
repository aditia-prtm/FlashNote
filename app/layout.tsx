import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'FlashNote' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-[#06080F] text-[#E2E8F0] min-h-screen">{children}</body>
    </html>
  )
}
