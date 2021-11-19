import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (!auth.user?.isAdmin) {
      response.unauthorized({ error: 'You must be administrator to access this route' })
      return
    }

    await next()
  }
}
