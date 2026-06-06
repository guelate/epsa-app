import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import api from '@/api/axios'
import type { Accident, Employee } from '@/interfaces/interface'

//Todo: export 
interface DeclareModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (accident: Accident) => void
}

export default function AtModel({ open, onClose, onSuccess }: DeclareModalProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [employeeId, setEmployeeId] = useState('')
  const [accidentDate, setAccidentDate] = useState('')
  const [accidentTime, setAccidentTime] = useState('')
  const [type, setType] = useState<'Lieu de travail' | 'Trajet'>('Lieu de travail')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [witness, setWitness] = useState('')

  // Fetches the employee list when the modal opens.
  useEffect(() => {
    if (!open) return
    api.get('/api/employees').then(({ data }) => setEmployees(data))
  }, [open])

  // Resets the form fields to their initial state.
  function resetForm() {
    setEmployeeId('')
    setAccidentDate('')
    setAccidentTime('')
    setType('Lieu de travail')
    setLocation('')
    setDescription('')
    setWitness('')
    setError('')
  }

  // Submits the accident declaration to the API.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await api.post('/api/accidents', {
        employee_id: Number(employeeId),
        accident_date: accidentDate,
        accident_time: accidentTime,
        type,
        location,
        description,
        witness: witness || null,
        status: 'En attente',
      })
      onSuccess(data)
      resetForm()
      onClose()
    } catch {
      setError('Une erreur est survenue. Vérifiez les champs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <span style={{ color: '#854F0B' }}>⚠</span>
            Déclarer un accident du travail
          </DialogTitle>
        </DialogHeader>

        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 mb-2">
          La DAT doit être transmise à la CPAM dans un délai légal de 48h.
        </div>

        {/* todo:split */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label>Employé</Label>
            <Select value={employeeId} onValueChange={setEmployeeId} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un employé" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={String(emp.id)}>
                    {emp.firstName} {emp.lastName} — {emp.position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="date">Date de l'accident</Label>
              <Input
                id="date"
                type="date"
                value={accidentDate}
                onChange={(e) => setAccidentDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Heure</Label>
              <Input
                id="time"
                type="time"
                value={accidentTime}
                onChange={(e) => setAccidentTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Type d'accident</Label>
              <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lieu de travail">Lieu de travail</SelectItem>
                  <SelectItem value="Trajet">Trajet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="location">Lieu précis</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Entrepôt Lyon"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez les circonstances de l'accident..."
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="witness">Témoin (optionnel)</Label>
            <Input
              id="witness"
              value={witness}
              onChange={(e) => setWitness(e.target.value)}
              placeholder="Nom du témoin"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              className="text-white"
              style={{ background: '#1a2f5a' }}
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}