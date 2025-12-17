import type { PropsWithChildren } from 'react'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps extends PropsWithChildren {
  /** If true, content spans full width (no max-width container) */
  fullWidth?: boolean
}

export default function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <TopBar />
      <Navbar />
      <main className={fullWidth ? 'flex-1' : 'mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-8 pb-16 sm:px-6'}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
