import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class RankingsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 20

    try {
      const profiles = await Profile.query().orderBy('points').paginate(page, limit)

      return profiles
    } catch {
      return response.badRequest('There is error to get the ranking')
    }
  }
}
