import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson'

export default class LessonsController {
  public async store({ request, response }: HttpContextContract) {
    const { trackId, title, description, content, points } = request.only([
      'trackId',
      'title',
      'description',
      'content',
      'points',
    ])

    try {
      const lesson = await Lesson.create({ trackId, title, description, content, points })
      return lesson
    } catch {
      return response.badRequest('There is error to created the lesson')
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const lessons = await Lesson.all()
      return lessons
    } catch {
      return response.badRequest('There is no lesson created for this id')
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const lesson = await Lesson.find(params.id)
      return lesson
    } catch {
      return response.badRequest('There is no lesson created for this id')
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { trackId, title, description, content, points } = request.only([
      'trackId',
      'title',
      'description',
      'content',
      'points',
    ])

    try {
      const lesson = await Lesson.findOrFail(params.id)
      await lesson.merge({ trackId, title, description, content, points }).save()

      return lesson
    } catch (e) {
      return response.badRequest('There is no lesson created for this id')
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const lesson = await Lesson.findOrFail(params.id)
      await lesson.delete()
    } catch (e) {
      return response.badRequest('There is no lesson existent for this id')
    }
  }
}
