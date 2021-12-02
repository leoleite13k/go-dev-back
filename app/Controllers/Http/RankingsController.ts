import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class RankingsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 20

    try {
      const ranking = await Profile.query().orderBy('points', 'desc').paginate(page, limit)

      return {
        ...ranking.serialize(),
        data: ranking.serialize().data.map((profile) => ({
          ...profile,
          avatar_options: JSON.parse(profile?.avatar_options || ''),
        })),
      }
    } catch {
      return response.badRequest('There is error to get the ranking')
    }
  }
}
