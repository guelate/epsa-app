import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Employee from './employee.js'

//Accident model 
export default class Accident extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare employeeId: number

  @column.date()
  declare accidentDate: DateTime

  @column()
  declare accidentTime: string

  @column()
  declare type: 'Lieu de travail' | 'Trajet'

  @column()
  declare location: string

  @column()
  declare description: string

  @column()
  declare witness: string | null

  @column()
  declare status: 'En attente' | 'Envoyé CPAM' | 'Reconnu' | 'Contesté'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Employee)
  declare employee: BelongsTo<typeof Employee>
}