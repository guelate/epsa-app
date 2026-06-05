import type { HttpContext } from '@adonisjs/core/http'
import Accident from '#models/accident'

export default class AccidentsController {

    //Fetch all work accidents
    async index({ response }: HttpContext) {
        const accidents = await Accident.query()
            .preload('employee')
            .orderBy('created_at', 'desc')
        return response.ok(accidents)
    }


    // Declare a new work accident 
    async store({ request, response }: HttpContext) {
        const data = request.only([
            'employee_id', 'accident_date', 'accident_time',
            'type', 'location', 'description', 'witness', 'status'
        ])
        const accident = await Accident.create(data)
        await accident.load('employee')
        return response.created(accident)
    }
}