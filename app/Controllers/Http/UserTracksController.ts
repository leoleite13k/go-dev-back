import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UserTracksController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const sql = `SELECT t2.*,
      SUM(user_tracks.number_of_lessons) AS number_of_lessons,
      SUM(user_tracks.number_of_lessons_completed) AS number_of_lessons_completed,
      ROUND(((SUM(user_tracks.number_of_lessons_completed) * 100) / SUM(user_tracks.number_of_lessons)), 2) AS percent_completed
      FROM (
        SELECT t.id as track_id, count(l.id) as number_of_lessons, 0 as number_of_lessons_completed
        FROM  tracks t
        INNER JOIN lessons l ON t.id = l.track_id
        GROUP BY t.id
        union all
        SELECT utl.track_id as track_id, 0 as number_of_lessons, count(utl.lesson_id) as number_of_lessons_completed
        FROM user_track_lessons utl
        where utl.completed = true
        and utl.user_id = :userId
        GROUP BY utl.track_id
      ) as user_tracks
      INNER JOIN tracks t2 ON user_tracks.track_id = t2.id
      GROUP BY t2.id
      ORDER BY t2.id`
      const bindings = { userId: auth.user!.id }
      const { rows: userTracksRows } = await Database.rawQuery(sql, bindings)

      const userTracks = userTracksRows.map((userTrack) => ({
        id: userTrack.id,
        title: userTrack.title,
        description: userTrack.description,
        photoUrl: userTrack.photo_url,
        numberOfLessons: userTrack.number_of_lessons,
        numberOfLessonsCompleted: userTrack.number_of_lessons_completed,
        percentCompleted: userTrack.percent_completed,
      }))

      return userTracks
    } catch {
      return response.badRequest('There is error to find the tracks for this user')
    }
  }
}
