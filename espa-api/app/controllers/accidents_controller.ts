import type { HttpContext } from '@adonisjs/core/http'
import Accident from '#models/accident'
import { accidentValidator } from '#validators/user'

export default class AccidentsController {
  // Fetch all work accidents with their related employee data.
  async index({ response }: HttpContext) {
    const accidents = await Accident.query()
      .preload('employee')
      .orderBy('created_at', 'desc')
    return response.ok(accidents)
  }

  // Validate and declare a new work accident.
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(accidentValidator)
    const accident = await Accident.create(data)
    await accident.load('employee')
    return response.created(accident)
  }
}