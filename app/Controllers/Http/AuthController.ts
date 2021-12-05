import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.create({ email, password })
      return user
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

      if (profile) {
        return {
          user: {
            ...user?.serialize(),
            profile: {
              ...profile.serialize(),
              avatarOptions: JSON.parse(profile.avatarOptions),
            },
          },
          token,
        }
      }

      return {
        user,
        token,
      }
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async forgot({ request, response }: HttpContextContract) {
    const { email, password, confirmPassword } = request.only([
      'email',
      'password',
      'confirmPassword',
    ])

    try {
      if (password !== confirmPassword) {
        return response.badRequest('The password is differente to confirm password')
      }

      const user = await User.findByOrFail('email', email)
      await user.merge({ email, password }).save()
      return user
    } catch {
      return response.badRequest('There was error to recover password for this user')
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const { email, password, confirmPassword } = request.only([
      'email',
      'password',
      'confirmPassword',
    ])

    try {
      if (password !== confirmPassword) {
        return response.badRequest('The password is differente to confirm password')
      }

      const user = await User.findByOrFail('id', auth.user?.id)
      await user.merge({ email, password }).save()
      return user
    } catch {
      return response.badRequest('There was error to update the user')
    }
  }
}
