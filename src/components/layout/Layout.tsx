import type { PropsWithChildren } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB] text-[#1F2937]">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-8 pb-16 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  )
}


