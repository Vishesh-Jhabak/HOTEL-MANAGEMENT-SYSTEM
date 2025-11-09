import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('GUEST')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()
  const { setAuth } = useAuth()

  const signup = async () => {
    setLoading(true); setError(null)
    try {
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)
      formData.append('role', role)
      
      const res = await axios.post('/api/auth/signup', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const token = res.data.data as string
      setAuth(token)
      nav('/guest')
    } catch (e: any) {
      console.error('Signup error:', e)
      setError(e?.response?.data?.message || 'Signup failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 rounded-2xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <div className="text-3xl font-semibold">Create account</div>
        </div>
        <div className="grid gap-3">
          <label className="text-sm opacity-80">Username</label>
          <input className="bg-zinc-800/80 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-zinc-400"
                 value={username} onChange={e => setUsername(e.target.value)} />
          <label className="text-sm opacity-80">Password</label>
          <input className="bg-zinc-800/80 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-zinc-400"
                 type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <label className="text-sm opacity-80">Role</label>
          <select className="bg-zinc-800/80 border border-zinc-700 rounded-lg p-3"
                  value={role} onChange={e => setRole(e.target.value)}>
            <option>GUEST</option>
            <option>RECEPTIONIST</option>
            <option>MANAGER</option>
            <option>HOUSEKEEPING</option>
            <option>ADMIN</option>
          </select>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button className="mt-2 bg-white text-black rounded-lg py-3 font-medium hover:bg-zinc-200 disabled:opacity-50"
                  disabled={loading} onClick={signup}>{loading ? 'Creating…' : 'Create account'}</button>
        </div>
      </div>
    </div>
  )
}


