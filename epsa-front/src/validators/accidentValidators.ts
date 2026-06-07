import { z } from 'zod'

// Validation schema for the accident declaration form.
export const accidentSchema = z.object({
  employeeId: z.string().min(1, 'Veuillez sélectionner un employé'),
  accidentDate: z.string().min(1, "Veuillez renseigner la date de l'accident"),
  accidentTime: z.string().min(1, "Veuillez renseigner l'heure de l'accident"),
  type: z.enum(['Lieu de travail', 'Trajet']),
  location: z.string().min(2, "Veuillez renseigner le lieu de l'accident"),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères'),
  witness: z.string().optional(),
})

export type AccidentFormData = z.infer<typeof accidentSchema>