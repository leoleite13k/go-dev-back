import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserTracks extends BaseSchema {
  protected tableName = 'user_tracks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_user').notNullable()
      table.integer('id_track').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('id_user').references('users.id').onUpdate('CASCADE').onDelete('CASCADE')
      table.foreign('id_track').references('tracks.id').onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('id_user')
      table.dropForeign('id_track')
    })
    this.schema.dropTable(this.tableName)
  }
}
