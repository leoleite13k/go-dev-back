import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Lesson from './Lesson'
import Track from './Track'

export default class UserTrackLesson extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public userId: number

  @column()
  public trackId: number

  @column()
  public lessonId: number

  @column()
  public completed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Track)
  public userTrackLesson: HasOne<typeof Track>

  @hasOne(() => Lesson)
  public lesson: HasOne<typeof Lesson>
}
