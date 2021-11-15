import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

type TJourney = {
  title: string
  description: string
  photo_url: string
  type: string
  date: DateTime
}

export default class JourneysController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const journey: TJourney[] = []

      const user = await User.query().preload('profile').where('id', auth.user!.id).firstOrFail()
      journey.push({
        title: 'Início da jornada',
        description: 'Esse foi seu primeiro passo para entrar na áre ade tecnologia',
        photo_url: user?.profile.avatarUrl,
        type: 'created_account',
        date: user?.createdAt,
      })

      const achivements: TJourney[] = await Database.from('user_achivements')
        .select(
          'achivements.title',
          'achivements.description',
          'achivements.photo_url',
          'user_achivements.created_at as date'
        )
        .select(Database.raw(`'achivement' as type`))
        .join('achivements', 'user_achivements.achivement_id', '=', 'achivements.id')
        .where('user_achivements.user_id', user.id)
        .orderBy('user_achivements.created_at')

      journey.push(...achivements)

      const sqlTracks = await Database.from('user_track_lessons')
        .select('tracks.title', 'tracks.description', 'tracks.photo_url')
        .select(
          Database.raw(`case when (
          select count(lessons.id)
          from lessons
          where lessons.track_id = tracks.id
        ) = (
          select count(user_track_lessons.id)
          from user_track_lessons
          where user_id = 1
          and user_track_lessons.track_id = tracks.id
          and completed  = true
        ) then true else false end as track_completed`)
        )
        .select(Database.raw('min(user_track_lessons.created_at) as date'))
        .select(Database.raw(`'track' as type`))
        .join('tracks', 'user_track_lessons.track_id', '=', 'tracks.id')
        .join('lessons', 'user_track_lessons.lesson_id', '=', 'lessons.id')
        .where('user_track_lessons.user_id', user.id)
        .groupBy('tracks.id', 'tracks.title', 'tracks.description', 'tracks.photo_url')
        .orderBy('date')

      const tracks = sqlTracks
        .filter((track) => !!track.track_completed)
        .map((track) => {
          delete track.track_completed
          return track
        })

      journey.push(...tracks)

      return journey.sort((a, b) => (a.date > b.date ? 1 : -1))
    } catch {
      return response.badRequest('There is error to get the journey')
    }
  }
}
