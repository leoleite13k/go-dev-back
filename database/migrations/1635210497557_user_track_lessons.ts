import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserTrackLessons extends BaseSchema {
  protected tableName = 'user_track_lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id_user_track').notNullable()
      table.integer('id_lesson').notNullable()
      table.boolean('completed').notNullable().defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table
        .foreign('id_user_track')
        .references('user_tracks.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.foreign('id_lesson').references('lessons.id').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('id_user_track')
      table.dropForeign('id_lesson')
    })
    this.schema.dropTable(this.tableName)
  }
}
