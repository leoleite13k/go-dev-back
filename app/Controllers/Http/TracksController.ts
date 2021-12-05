import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
import UserTrackLesson from 'App/Models/UserTrackLesson'

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
      const tracks = await Track.query().select('*').orderBy('id')
      return tracks
    } catch {
      return response.badRequest('There is no track created for this id')
    }
  }

  public async show({ auth, params, response }: HttpContextContract) {
    try {
      const trackLessons = await Track.query()
        .preload('lessons')
        .where('id', params.id)
        .firstOrFail()
      const userTrackLessons = await UserTrackLesson.query()
        .where('userId', auth.user!.id)
        .andWhere('trackId', params.id)

      const track = {
        ...trackLessons.serialize(),
        lessons: trackLessons
          .serialize()
          .lessons.map((lesson) => ({
            ...lesson,
            completed: !!userTrackLessons.find((utl) => utl.lessonId === lesson.id)?.completed,
          }))
          .sort((a, b) => a.id - b.id),
      }

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
