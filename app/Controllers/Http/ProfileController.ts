import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class ProfileController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { fullName, avatarUrl } = request.only(['fullName', 'avatarUrl'])

    try {
      const profile = await Profile.create({ userId: auth.user?.id, fullName, avatarUrl })
      return profile
    } catch {
      return response.badRequest('There is already an profile created for this account')
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const profile = await Profile.findBy('user_id', params.id)
      return profile
    } catch {
      return response.badRequest('There is no profile created for this account')
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { fullName, avatarUrl } = request.only(['fullName', 'avatarUrl'])

    try {
      const profile = await Profile.findByOrFail('user_id', params.id)

      await profile.merge({ fullName, avatarUrl }).save()

      return profile
    } catch (e) {
      return response.badRequest('There is no profile created for this account')
    }
  }
}
