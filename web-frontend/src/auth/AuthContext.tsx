import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Role = 'ADMIN' | 'MANAGER' | 'RECEPTIONIST' | 'GUEST' | 'HOUSEKEEPING'

type User = {
  username: string
  role: Role
}

type AuthState = {
  token: string | null
  user: User | null
  setAuth: (t: string | null) => void
  logout: () => void
}

const Ctx = createContext<AuthState>({ token: null, user: null, setAuth: () => {}, logout: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!token) { setUser(null); return }
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as any
      setUser({ username: payload.sub, role: payload.role as Role })
    } catch { setUser(null) }
  }, [token])

  const setAuth = (t: string | null) => {
    setToken(t)
    if (t) localStorage.setItem('token', t); else localStorage.removeItem('token')
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  const value = useMemo(() => ({ token, user, setAuth, logout }), [token, user])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() { return useContext(Ctx) }


