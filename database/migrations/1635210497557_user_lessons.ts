import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserLessons extends BaseSchema {
  protected tableName = 'user_lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id_user').notNullable()
      table.integer('id_lesson').notNullable()
      table.boolean('completed').notNullable().defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('id_lesson').references('lessons.id').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('id_user')
      table.dropForeign('id_lesson')
    })
    this.schema.dropTable(this.tableName)
  }
}
