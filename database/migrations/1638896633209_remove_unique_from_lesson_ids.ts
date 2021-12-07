import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserTrackLessons extends BaseSchema {
  protected tableName = 'user_track_lessons'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('lesson_id')
      table.dropColumn('lesson_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('lesson_id')
        .notNullable()
        .unique()
        .references('lessons.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .after('track_id')
    })
  }
}
