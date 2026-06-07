import type { HttpContext } from '@adonisjs/core/http'
import Employee from '#models/employee'

export default class EmployeesController {
  // Fetch all employees ordered by first name.
  async index({ response }: HttpContext) {
    const employees = await Employee.query().orderBy('first_name', 'asc')
    return response.ok(employees)
  }
}