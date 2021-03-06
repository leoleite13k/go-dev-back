import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Lessons extends BaseSchema {
  protected tableName = 'lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('track_id')
        .notNullable()
        .references('tracks.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('description')
      table.string('content').notNullable()
      table.integer('points').defaultTo(0).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('track_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
