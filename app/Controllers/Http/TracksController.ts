import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'

export default class TracksController {
  public async store({ request, response }: HttpContextContract) {
    const { title, photoUrl, description } = request.only(['title', 'photoUrl', 'description'])

    try {
      const track = await Track.create({ title, photoUrl, description })
      return track
    } catch {
      return response.badRequest('There is error to created the track')
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const tracks = await Track.all()
      return tracks
    } catch {
      return response.badRequest('There is no track created for this id')
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const track = await Track.query().preload('lesson').where('id', params.id)

      return track
    } catch {
      return response.badRequest('There is no track created for this id')
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { title, photoUrl, description } = request.only(['title', 'photoUrl', 'description'])

    try {
      const track = await Track.findOrFail(params.id)
      await track.merge({ title, photoUrl, description }).save()

      return track
    } catch (e) {
      return response.badRequest('There is no track created for this id')
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const track = await Track.findOrFail(params.id)
      await track.delete()
    } catch (e) {
      return response.badRequest('There is no track existent for this id')
    }
  }
}
