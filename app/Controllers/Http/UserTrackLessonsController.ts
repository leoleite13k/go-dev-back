import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Lesson from 'App/Models/Lesson'
import Profile from 'App/Models/Profile'
import Achivement from 'App/Models/Achivement'
import UserAchivement from 'App/Models/UserAchivement'
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
      const profile = await Profile.findByOrFail('userId', auth.user?.id)
      await profile
        .merge({
          points: !userTrackLesson?.completed
            ? profile.points + lesson.points
            : profile.points - lesson.points,
        })
        .save()

      const achivement1 = await Achivement.findBy('id', 1)

      if (achivement1) {
        await UserAchivement.firstOrCreate({
          achivementId: 1,
          userId: auth.user?.id,
        })
      }

      const achivement2 = await Achivement.findBy('id', 2)

      if (achivement2) {
        const completedTrack = await Database.from('lessons')
          .count('lessons.id', 'numberOfLessons')
          .count('user_track_lessons.id', 'numberOfLessonsCompleted')
          .leftJoin('user_track_lessons', 'lessons.id', '=', 'user_track_lessons.lesson_id')
          .where('lessons.track_id', trackId)
          .first()

        if (completedTrack.numberOfLessons === completedTrack.numberOfLessonsCompleted) {
          await UserAchivement.firstOrCreate({
            achivementId: 2,
            userId: auth.user?.id,
          })
        }
      }

      const achivement3 = await Achivement.findBy('id', 3)

      if (achivement3) {
        const focusTrack = await Database.from('user_track_lessons')
          .count('user_track_lessons.id', 'numberOfLessonsCompleted')
          .first()

        if (focusTrack.numberOfLessonsCompleted > 10) {
          await UserAchivement.firstOrCreate({
            achivementId: 3,
            userId: auth.user?.id,
          })
        }
      }

      const achivement4 = await Achivement.findBy('id', 4)

      if (achivement4) {
        const rankingTop5 = await Database.from('profiles').limit(5).orderBy('points', 'desc')

        if (rankingTop5.find((profile) => profile.user_id === auth.user?.id)) {
          await UserAchivement.firstOrCreate({
            achivementId: 4,
            userId: auth.user?.id,
          })

          const achivement5 = await Achivement.findBy('id', 5)

          if (achivement5 && rankingTop5[0].user_id === auth.user?.id) {
            await UserAchivement.firstOrCreate({
              achivementId: 5,
              userId: auth.user?.id,
            })
          }
        }
      }

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
