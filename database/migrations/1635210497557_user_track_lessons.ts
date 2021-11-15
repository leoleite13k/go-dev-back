import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserTrackLessons extends BaseSchema {
  protected tableName = 'user_track_lessons'

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
        .integer('track_id')
        .notNullable()
        .references('tracks.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('lesson_id')
        .notNullable()
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
      table.dropForeign('track_id')
      table.dropForeign('lesson_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
