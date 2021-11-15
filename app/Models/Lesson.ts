import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Track from './Track'

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public trackId: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public content: string

  @column()
  public points: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Track)
  public track: BelongsTo<typeof Track>
}
