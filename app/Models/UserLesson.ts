import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserLesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idUser: number

  @column()
  public idLesson: number

  @column()
  public complete: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
