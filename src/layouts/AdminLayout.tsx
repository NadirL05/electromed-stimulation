import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import Header from '../components/dashboard/Header'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col md:ml-64">
        <Header onMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 bg-zinc-900 px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

