import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
import UserLesson from 'App/Models/UserLesson'

export default class UserLessonsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { lessonId } = request.only(['lessonId'])

    try {
      const userLesson = await UserLesson.create({
        userId: auth.user?.id,
        lessonId,
        completed: true,
      })

      return userLesson
    } catch (e) {
      console.log(e)
      return response.badRequest('This lesson already exists for this user')
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
      return response.badRequest('There is error to to find the achivements for this user')
    }
  }

  public async update({ params, response }: HttpContextContract) {
    try {
      const userLesson = await UserLesson.findOrFail(params.id)
      await userLesson.merge({ completed: !userLesson.completed }).save()

      return userLesson
    } catch (e) {
      console.log(e)
      return response.badRequest('This lesson already exists for this user')
    }
  }
}
