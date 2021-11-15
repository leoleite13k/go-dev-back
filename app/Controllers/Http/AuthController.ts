import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.create({ email, password })
      return { user }
    } catch {
      return response.badRequest('There is already an account created with this email')
    }
  }

  public async signIn({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.findBy('email', email)
      const profile = await Profile.findBy('user_id', user?.id)
      const token = await auth.use('api').attempt(email, password, { name: user?.email })

      return {
        user: {
          ...user?.serialize(),
          profile: profile?.serialize(),
        },
        token,
      }
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
