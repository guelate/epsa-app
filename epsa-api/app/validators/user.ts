import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})


// Validates the accident declaration payload before saving to the database.
export const accidentValidator = vine.compile(
  vine.object({
    employee_id: vine.number().positive(),
    accident_date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/).trim(),
    accident_time: vine.string().regex(/^\d{2}:\d{2}$/),
    type: vine.enum(['Lieu de travail', 'Trajet']),
    location: vine.string().minLength(2).trim(),
    description: vine.string().minLength(10).trim(),
    witness: vine.string().nullable().optional(),
    status: vine.enum(['En attente', 'Envoyé CPAM', 'Reconnu', 'Contesté']),
  })
)