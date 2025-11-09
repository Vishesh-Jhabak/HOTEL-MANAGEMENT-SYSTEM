import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './pages/Root'
import Rooms from './pages/Rooms'
import Bookings from './pages/Bookings'
import Login from './pages/Login'
import { AuthProvider } from './auth/AuthContext'
import { HotelDataProvider } from './context/HotelDataContext'
import { RequireAuth, RequireRole } from './auth/Protected'
import Signup from './pages/Signup'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import ManagerDashboard from './pages/dashboards/ManagerDashboard'
import ReceptionDashboard from './pages/dashboards/ReceptionDashboard'
import HousekeepingDashboard from './pages/dashboards/HousekeepingDashboard'
import GuestDashboard from './pages/dashboards/GuestDashboard'
import RoomBooking from './pages/RoomBooking'

const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/rooms', element: <Rooms /> },
  { path: '/bookings', element: <Bookings /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/booking', element: <RoomBooking /> },
  { path: '/admin', element: <RequireRole role="ADMIN"><AdminDashboard /></RequireRole> },
  { path: '/manager', element: <RequireRole role="MANAGER"><ManagerDashboard /></RequireRole> },
  { path: '/reception', element: <RequireRole role="RECEPTIONIST"><ReceptionDashboard /></RequireRole> },
  { path: '/housekeeping', element: <RequireRole role="HOUSEKEEPING"><HousekeepingDashboard /></RequireRole> },
  { path: '/guest', element: <RequireAuth><GuestDashboard /></RequireAuth> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <HotelDataProvider>
        <RouterProvider router={router} />
      </HotelDataProvider>
    </AuthProvider>
  </React.StrictMode>
)
