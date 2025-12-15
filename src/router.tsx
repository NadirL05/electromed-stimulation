import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import Sessions from './pages/Sessions'
import Coaches from './pages/Coaches'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Booking from './pages/Booking'
import Credits from './pages/Credits'
import PaymentSuccess from './pages/PaymentSuccess'
import AdminDashboard from './pages/admin/AdminDashboard'
import CoachesManagement from './pages/admin/CoachesManagement'
import SessionsManagement from './pages/admin/SessionsManagement'
import MembersManagement from './pages/admin/MembersManagement'
import Analytics from './pages/admin/Analytics'
import AdminRoute from './guards/AdminRoute'
import Home from './pages/Home'
import ServicesPage from './pages/Services'
import PricingPage from './pages/Pricing'
import ContactPage from './pages/Contact'
import { useAuthStore } from './stores/authStore'

function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/payment/success',
    element: <PaymentSuccess />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'sessions', element: <Sessions /> },
          { path: 'booking', element: <Booking /> },
          { path: 'coaches', element: <Coaches /> },
          { path: 'credits', element: <Credits /> },
          { path: 'profile', element: <Profile /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
      {
        path: '/admin',
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'coaches', element: <CoachesManagement /> },
          { path: 'sessions', element: <SessionsManagement /> },
          { path: 'members', element: <MembersManagement /> },
          { path: 'analytics', element: <Analytics /> },
        ],
      },
    ],
  },
])

