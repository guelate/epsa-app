import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Accident from './accident.js'

//Employee model 
export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare position: string

  @column()
  declare contractType: 'CDI' | 'CDD' | 'Stage'

  @column()
  declare salary: number

  @column()
  declare status: 'Actif' | 'En congé' | 'Inactif'

  @column.date()
  declare hiredAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Accident)
  declare accidents: HasMany<typeof Accident>
}