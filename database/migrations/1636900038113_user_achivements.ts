import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserAchivements extends BaseSchema {
  protected tableName = 'user_achivements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id_user').notNullable()
      table.integer('id_achivement').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
      table
        .foreign('id_achivement')
        .references('achivements.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('id_user')
      table.dropForeign('id_achivement')
    })
    this.schema.dropTable(this.tableName)
  }
}
