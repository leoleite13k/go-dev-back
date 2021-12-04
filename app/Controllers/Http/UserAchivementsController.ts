import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Achivement from 'App/Models/Achivement'
import UserAchivement from 'App/Models/UserAchivement'

export default class UserAchivementsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { achivementId } = request.only(['achivementId'])

    try {
      await UserAchivement.firstOrCreate({ userId: auth.user?.id, achivementId })
      const achivement = await Achivement.findOrFail(achivementId)

      return achivement
    } catch {
      return response.badRequest('This achievement already exists for this user')
    }
  }

  public async index({ auth, response }: HttpContextContract) {
    try {
      const userAchivements = await UserAchivement.query().where('userId', auth.user!.id)
      const achivementsIds = userAchivements.map((userAchivement) => userAchivement.achivementId)
      const achivements = await Achivement.findMany(achivementsIds)

      return achivements
    } catch {
      return response.badRequest('There is error to find the achivements for this user')
    }
  }
}
