import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id_user').unique().notNullable()
      table.string('name').notNullable()
      table.string('avatar')
      table.string('ddd_phone')
      table.string('phone')
      table.integer('point').defaultTo(0).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('id_user')
    })
    this.schema.dropTable(this.tableName)
  }
}
