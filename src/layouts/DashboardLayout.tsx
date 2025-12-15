import { Outlet } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import { useState } from 'react'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex flex-1 flex-col md:ml-64">
        <Header onMenu={() => setOpen(true)} />
        <main className="flex-1 bg-zinc-900 px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

