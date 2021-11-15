import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserAchivement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idUser: number

  @column()
  public idAchivement: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
