import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import api from '@/api/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Submits credentials to the API and stores the token on success.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      login(data.user, data.token)
      navigate('/')
    } catch {
      setError('Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md shadow-sm">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1a2f5a' }}>
            <span className="text-white text-sm font-medium">EP</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">EPSA Group</p>
            <p className="text-xs text-gray-400">Gestion des accidents du travail</p>
          </div>
        </div>

        <h1 className="text-xl font-medium text-gray-900 mb-1">Connexion</h1>
        <p className="text-sm text-gray-500 mb-6">Accédez à votre espace de gestion</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@epsa-group.com"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full text-white"
            style={{ background: '#1a2f5a' }}
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Connexion sécurisée — EPSA © 2025
        </p>
      </div>
    </div>
  )
}