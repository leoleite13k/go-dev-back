import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson'
import Profile from 'App/Models/Profile'
import UserTrackLesson from 'App/Models/UserTrackLesson'

export default class UserTrackLessonsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { trackId, lessonId } = request.only(['trackId', 'lessonId'])

    try {
      const userTrackLesson = await UserTrackLesson.query()
        .where('userId', auth.user!.id)
        .andWhere('trackId', trackId)
        .andWhere('lessonId', lessonId)
        .first()

      const newUserTrackLesson = await UserTrackLesson.updateOrCreate(
        { userId: auth.user!.id, trackId, lessonId },
        {
          userId: auth.user?.id,
          trackId,
          lessonId,
          completed: !userTrackLesson?.completed,
        }
      )

      const lesson = await Lesson.findOrFail(lessonId)
      const profile = await Profile.findByOrFail('userId', auth.user!.id)
      await profile
        .merge({
          points: !userTrackLesson?.completed
            ? profile.points + lesson.points
            : profile.points - lesson.points,
        })
        .save()

      return newUserTrackLesson
    } catch {
      return response.badRequest('This lesson not exist to set completed')
    }
  }

  public async index({ auth, request, response }: HttpContextContract) {
    const { trackId } = request.only(['trackId'])

    try {
      const userTrackLessons = await UserTrackLesson.query()
        .where('userId', auth.user!.id)
        .andWhere('trackId', trackId)

      return userTrackLessons
    } catch {
      return response.badRequest(
        'There is error to find the lessons inside teh track for this user'
      )
    }
  }
}
