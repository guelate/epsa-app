import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accidents'

  
   //Create accidents table 
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')                                                                                             
      table.integer('employee_id').unsigned().references('id').inTable('employees').onDelete('CASCADE')                 
      table.date('accident_date').notNullable()                                                                         
      table.time('accident_time').notNullable()                                                                        
      table.enum('type', ['Lieu de travail', 'Trajet']).notNullable()                                                 
      table.string('location').notNullable()                                                                           
      table.text('description').notNullable()                                                                          
      table.string('witness').nullable()                                                                               
      table.enum('status', ['En attente', 'Envoyé CPAM', 'Reconnu', 'Contesté']).defaultTo('En attente')              
      table.timestamp('created_at')                                                                                    
      table.timestamp('updated_at')                                                                                   
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}