import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '@/api/axios'

//Header dashboard, shows user info and logout button.
export default function Topbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

 
  async function handleLogout() {
    try {
      await api.post('/api/auth/logout')
    } finally {
      logout()
      navigate('/login')
    }
  }

  return (
    <header className="h-12 flex items-center justify-between px-5" style={{ background: '#1a2f5a' }}>
      <span className="text-white text-sm font-medium tracking-wide">
        EPSA — Gestion des accidents du travail
      </span>
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white text-xs font-medium">
        {/* Todo: Name admin */}
          {user?.email?.slice(0, 1).toUpperCase() ?? 'G'}
        </div>
        <span className="text-white/70 text-xs">{user?.email ?? 'Gilles'}</span>
        <button onClick={handleLogout} className="text-white/50 hover:text-white/80 transition-colors text-xs">
          Déconnexion
        </button>
      </div>
    </header>
  )
}