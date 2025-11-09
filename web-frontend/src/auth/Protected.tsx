import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}

export function RequireRole({ role, children }: { role: string, children: JSX.Element }) {
  const { user } = useAuth()
  if (user?.role !== role) return <Navigate to="/login" replace />
  return children
}


