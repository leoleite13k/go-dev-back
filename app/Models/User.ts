import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'

import Profile from './Profile'
import UserAchivement from './UserAchivement'
import UserTrackLesson from './UserTrackLesson'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public isAdmin: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => UserAchivement)
  public achivements: HasMany<typeof UserAchivement>

  @hasMany(() => UserTrackLesson)
  public lessons: HasMany<typeof UserTrackLesson>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
