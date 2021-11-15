import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserLessons extends BaseSchema {
  protected tableName = 'user_lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('lesson_id')
        .unsigned()
        .unique()
        .references('lessons.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.boolean('completed').notNullable().defaultTo(false)

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
      table.dropForeign('lesson_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
