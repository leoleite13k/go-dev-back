import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .unique()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('full_name')
      table.text('avatar_url')
      table.integer('points').defaultTo(0)

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
    })
    this.schema.dropTable(this.tableName)
  }
}
