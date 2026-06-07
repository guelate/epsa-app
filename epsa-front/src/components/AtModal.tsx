import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import api from '@/api/axios'
import type { DeclareModalProps, Employee, TypeLocationFieldsProps } from '@/interfaces/interface'
import { ACCIDENT_TYPES, DEFAULT_FORM } from '@/constants/constants'
import type { AccidentType } from '@/types/type'
import { EmployeeSelect } from './EmployeeSelect'
import { DateTimeFields } from './DateTimeFields'


// Renders the accident type selector and location input
function TypeLocationFields({ type, location, onTypeChange, onLocationChange }: TypeLocationFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <Label>Type d'accident</Label>
        <Select value={type} onValueChange={(v) => onTypeChange(v as AccidentType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ACCIDENT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label htmlFor="location">Lieu précis</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Ex: Entrepôt Lyon"
          required
        />
      </div>
    </div>
  )
}

// Modal form to declare a work accident
export default function AtModal({ open, onClose, onSuccess }: DeclareModalProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState(DEFAULT_FORM)

  // Fetches the employee list when the modal opens.
  useEffect(() => {
    if (!open) return
    api.get('/api/employees').then(({ data }) => setEmployees(data))
  }, [open])

  // Updates a single field in the form state.
  function setField<K extends keyof typeof DEFAULT_FORM>(key: K, value: typeof DEFAULT_FORM[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // Resets the form fields to their initial state.
  function resetForm() {
    setForm(DEFAULT_FORM)
    setError('')
  }

  // Submits the accident declaration to the API.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await api.post('/api/accidents', {
        employee_id: Number(form.employeeId),
        accident_date: form.accidentDate,
        accident_time: form.accidentTime,
        type: form.type,
        location: form.location,
        description: form.description,
        witness: form.witness || null,
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

        <form onSubmit={handleSubmit} className="space-y-3">
          <EmployeeSelect
            employees={employees}
            value={form.employeeId}
            onChange={(v) => setField('employeeId', v)}
          />
          <DateTimeFields
            date={form.accidentDate}
            time={form.accidentTime}
            onDateChange={(v) => setField('accidentDate', v)}
            onTimeChange={(v) => setField('accidentTime', v)}
          />
          <TypeLocationFields
            type={form.type}
            location={form.location}
            onTypeChange={(v) => setField('type', v)}
            onLocationChange={(v) => setField('location', v)}
          />

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setField('description', e.target.value)}
              placeholder="Décrivez les circonstances de l'accident..."
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="witness">Témoin (optionnel)</Label>
            <Input
              id="witness"
              value={form.witness}
              onChange={(e) => setField('witness', e.target.value)}
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