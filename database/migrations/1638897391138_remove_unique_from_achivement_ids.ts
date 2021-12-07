import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserAchivements extends BaseSchema {
  protected tableName = 'user_achivements'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('achivement_id')
      table.dropColumn('achivement_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('achivement_id')
        .notNullable()
        .unique()
        .references('achivements.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }
}
