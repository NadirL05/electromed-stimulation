import { Outlet } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import { useState } from 'react'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 text-white">
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      <Sidebar open={open} onClose={() => setOpen(false)} />
      
      <div className="flex flex-1 flex-col md:ml-72">
        <Header onMenu={() => setOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

