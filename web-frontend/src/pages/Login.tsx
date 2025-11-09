import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()
  const { setAuth } = useAuth()

  const demo = (prefix: string) => { setUsername(prefix + '1'); setPassword('password') }

  const login = async () => {
    setLoading(true); setError(null)
    try {
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)
      
      const res = await axios.post('/api/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const token = res.data.data as string
      setAuth(token)
      const payload = JSON.parse(atob(token.split('.')[1])) as any
      const role = payload.role as string
      const route = role === 'ADMIN' ? '/admin' : role === 'MANAGER' ? '/manager' : role === 'RECEPTIONIST' ? '/reception' : role === 'HOUSEKEEPING' ? '/housekeeping' : '/guest'
      nav(route)
    } catch (e: any) {
      console.error('Login error:', e)
      const errorMessage = e.response?.data?.message || e.message || 'Invalid credentials or server unavailable'
      setError(errorMessage)
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 rounded-2xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <div className="text-3xl font-semibold">JAVA HOTEL MANAGEMENT SYSTEM</div>
          <div className="opacity-70 mt-1">Welcome back • Please sign in</div>
        </div>
        <div className="grid gap-3">
          <label className="text-sm opacity-80">Username</label>
          <input className="bg-zinc-800/80 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-zinc-400"
                 placeholder="e.g. admin1, mgr1, rec1, hk1, guest1"
                 value={username} onChange={e => setUsername(e.target.value)} />
          <label className="text-sm opacity-80">Password</label>
          <input className="bg-zinc-800/80 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-zinc-400"
                 type="password" placeholder="Your password"
                 value={password} onChange={e => setPassword(e.target.value)} />

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <button disabled={loading}
                  className="mt-2 bg-white text-black rounded-lg py-3 font-medium hover:bg-zinc-200 disabled:opacity-50"
                  onClick={login}>{loading ? 'Signing in…' : 'Sign in'}</button>

          <div className="mt-4 text-xs opacity-70">Quick demo roles</div>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 hover:border-zinc-500" onClick={() => demo('admin')}>Admin</button>
            <button className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 hover:border-zinc-500" onClick={() => demo('mgr')}>Manager</button>
            <button className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 hover:border-zinc-500" onClick={() => demo('rec')}>Reception</button>
            <button className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 hover:border-zinc-500" onClick={() => demo('hk')}>Housekeeping</button>
            <button className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 hover:border-zinc-500" onClick={() => demo('guest')}>Guest</button>
          </div>

          <div className="mt-4 text-center text-sm">
            <a href="/signup" className="underline opacity-90">Create an account</a>
          </div>
          <div className="mt-4 text-xs opacity-60 text-center">SAML / Google / Apple SSO (coming soon)</div>
        </div>
      </div>
    </div>
  )
}


