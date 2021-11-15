import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
import UserLesson from 'App/Models/UserLesson'

export default class UserLessonsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { lessonId } = request.only(['lessonId'])

    try {
      let userLesson = await UserLesson.query()
        .where('userId', auth.user!.id)
        .andWhere('lessonId', lessonId)
        .first()

      const newUserLesson = await UserLesson.updateOrCreate(
        {},
        {
          userId: auth.user?.id,
          lessonId,
          completed: !userLesson?.completed,
        }
      )

      return newUserLesson
    } catch {
      return response.badRequest('This lesson not exist to set completed')
    }
  }

  public async index({ auth, request, response }: HttpContextContract) {
    const { trackId } = request.only(['trackId'])

    try {
      const track = await Track.query().preload('lesson').where('id', trackId).first()
      const lessonIds = track?.lesson.map((lesson) => lesson.id)
      const userLessons = await UserLesson.query()
        .where('userId', auth.user!.id)
        .andWhereIn('lessonId', lessonIds)

      return userLessons
    } catch {
      return response.badRequest('There is error to find the lesson for this user')
    }
  }
}
