import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserAchivements extends BaseSchema {
  protected tableName = 'user_achivements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .notNullable()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('achivement_id')
        .notNullable()
        .unique()
        .references('achivements.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('user_id')
      table.dropForeign('achivement_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
