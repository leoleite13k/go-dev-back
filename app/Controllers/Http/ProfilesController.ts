import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { fullName, avatarOptions } = request.only(['fullName', 'avatarOptions'])

    try {
      const profile = await Profile.create({
        userId: auth.user?.id,
        fullName,
        avatarOptions: JSON.stringify(avatarOptions),
      })
      return {
        ...profile.serialize(),
        avatarOptions: avatarOptions,
        points: 0,
        level: 0,
        percentLevel: 0,
      }
    } catch {
      return response.badRequest('There is already an profile created for this account')
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const profile = await Profile.findBy('user_id', params.id)
      return { ...profile?.serialize(), avatarOptions: JSON.parse(profile?.avatarOptions || '') }
    } catch {
      return response.badRequest('There is no profile created for this account')
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { fullName, avatarOptions } = request.only(['fullName', 'avatarOptions'])

    try {
      const profile = await Profile.findByOrFail('user_id', params.id)
      await profile.merge({ fullName, avatarOptions: JSON.stringify(avatarOptions) }).save()

      return { ...profile?.serialize(), avatarOptions: JSON.parse(profile?.avatarOptions || '') }
    } catch {
      return response.badRequest('There is no profile created for this account')
    }
  }
}
