import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  //create employees table 
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')                                                        
      table.string('first_name').notNullable()                                      
      table.string('last_name').notNullable()                                       
      table.string('email').notNullable().unique()                                  
      table.string('position').notNullable()                                        
      table.enum('contract_type', ['CDI', 'CDD', 'Stage']).notNullable()           
      table.decimal('salary', 10, 2).notNullable()                                 
      table.enum('status', ['Actif', 'En congé', 'Inactif']).defaultTo('Actif')   
      table.date('hired_at').notNullable()                                          
      table.timestamp('created_at')                                                 
      table.timestamp('updated_at')                                                 
    })
  }

  // delete table
  async down() {
    this.schema.dropTable(this.tableName)
  }
}