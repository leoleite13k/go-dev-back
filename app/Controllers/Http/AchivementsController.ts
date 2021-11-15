import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Achivement from 'App/Models/Achivement'

export default class AchivementsController {
  public async store({ request, response }: HttpContextContract) {
    const { title, photoUrl, description } = request.only(['title', 'photoUrl', 'description'])

    try {
      const achivement = await Achivement.create({ title, photoUrl, description })
      return achivement
    } catch {
      return response.badRequest('There is error to created the achivement')
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const achivements = await Achivement.all()
      return achivements
    } catch {
      return response.badRequest('There is no achivement created for this id')
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const achivement = await Achivement.find(params.id)
      return achivement
    } catch {
      return response.badRequest('There is no achivement created for this id')
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { title, photoUrl, description } = request.only(['title', 'photoUrl', 'description'])

    try {
      const achivement = await Achivement.findOrFail(params.id)
      await achivement.merge({ title, photoUrl, description }).save()

      return achivement
    } catch (e) {
      return response.badRequest('There is no achivement created for this id')
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const achivement = await Achivement.findOrFail(params.id)
      await achivement.delete()
    } catch (e) {
      return response.badRequest('There is no achivement existent for this id')
    }
  }
}
