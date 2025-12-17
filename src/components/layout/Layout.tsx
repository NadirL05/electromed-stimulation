import type { PropsWithChildren } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-gray-50/50 to-white text-gray-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-orange-200/20 via-pink-200/20 to-purple-200/20 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -right-40 h-96 w-96 rounded-full bg-gradient-to-tl from-cyan-200/20 via-blue-200/20 to-indigo-200/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
      
      <Navbar />
      <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}


