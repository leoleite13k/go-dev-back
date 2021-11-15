import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

const POINTS_PER_LEVEL = 500

export default class Profile extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public userId: number

  @column()
  public fullName: string

  @column()
  public avatarUrl: string

  @column()
  public points: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @computed()
  public get percent_level() {
    return this.points / POINTS_PER_LEVEL - Math.floor(this.points / POINTS_PER_LEVEL)
  }

  @computed()
  public get level() {
    return Math.floor(this.points / POINTS_PER_LEVEL)
  }
}
