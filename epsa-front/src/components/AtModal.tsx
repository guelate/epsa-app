import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import api from '@/api/axios'
import { ACCIDENT_TYPES } from '@/constants/constants'
import { EmployeeSelect } from './EmployeeSelect'
import type { DeclareModalProps, Employee } from '@/interfaces/interface'
import { accidentSchema, type AccidentFormData } from '@/validators/accidentValidators'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'

// Error message displayed under a field.
function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-red-500 mt-0.5">{message}</p>
}

// Modal form to declare a work accident and submit it to the API.
export default function AtModal({ open, onClose, onSuccess }: DeclareModalProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccidentFormData>({
    resolver: zodResolver(accidentSchema),
    defaultValues: {
      employeeId: '',
      accidentDate: '',
      accidentTime: '',
      type: 'Lieu de travail',
      location: '',
      description: '',
      witness: '',
    },
  })

  // Fetches the employee list when the modal opens.
  useEffect(() => {
    if (!open) return
    api.get('/api/employees').then(({ data }) => setEmployees(data))
  }, [open])

  // Submits the accident declaration to the API.
  async function onSubmit(formData: AccidentFormData) {

    console.log('Submitting form with data:') // Debug log
    setServerError('')
    try {
      const { data } = await api.post('/api/accidents', {
        employee_id: Number(formData.employeeId),
        accident_date: formData.accidentDate,
        accident_time: formData.accidentTime,
        type: formData.type,
        location: formData.location,
        description: formData.description,
        witness: formData.witness || null,
        status: 'En attente',
      })
      onSuccess(data)
      reset()
      onClose()
    } catch {
      setServerError('Une erreur est survenue. Vérifiez les champs.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <span style={{ color: '#854F0B' }}>⚠</span>
            Déclarer un accident du travail
          </DialogTitle>
        </DialogHeader>

        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 mb-2">
          La DAT doit être transmise à la CPAM dans un délai légal de 48h.
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

          {/* Employee */}
          <Controller
            name="employeeId"
            control={control}
            render={({ field }) => (
              <EmployeeSelect
                employees={employees}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <FieldError message={errors.employeeId?.message} />

          {/* Date & Time */}
          <div className="flex flex-col gap-3">
            <div className="space-y-1">
              <Label>Date de l'accident</Label>
              <Controller
                name="accidentDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(new Date(field.value), 'dd MMMM yyyy', { locale: fr })
                          : 'Sélectionner une date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto bg-white border border-gray-200 p-0 z-50">
                      <Calendar
                        mode="single"
                        locale={fr}
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date: Date | undefined) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                        className="bg-white p-3 [&_td]:p-1 [&_button]:h-8 [&_button]:w-8 [&_button]:text-center"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              <FieldError message={errors.accidentDate?.message} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="time">Heure</Label>
              <Controller
                name="accidentTime"
                control={control}
                render={({ field }) => (
                  <Input
                    id="time"
                    type="time"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <FieldError message={errors.accidentTime?.message} />
            </div>
          </div>

          {/* Type & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Type d'accident</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACCIDENT_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.type?.message} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="location">Lieu précis</Label>
              <Input
                id="location"
                placeholder="Ex: Entrepôt Lyon"
                {...register('location')}
              />
              <FieldError message={errors.location?.message} />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Décrivez les circonstances de l'accident..."
              {...register('description')}
            />
            <FieldError message={errors.description?.message} />
          </div>

          {/* Witness */}
          <div className="space-y-1">
            <Label htmlFor="witness">Témoin (optionnel)</Label>
            <Input
              id="witness"
              placeholder="Nom du témoin"
              {...register('witness')}
            />
          </div>

          {serverError && <p className="text-sm text-red-500">{serverError}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => { reset(); onClose() }}>
              Annuler
            </Button>
            <Button
              type="submit"
              className="text-white"
              style={{ background: '#1a2f5a' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}