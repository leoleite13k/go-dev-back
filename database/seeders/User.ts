import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const uniqueKey = 'email'

    const users = await User.updateOrCreateMany(uniqueKey, [
      {
        email: 'leoleite@gmail.com',
        password: 'password123',
        isAdmin: true,
      },
      {
        email: 'virk@gmail.com',
        password: 'password123',
      },
      {
        email: 'romain@hotmail.com',
        password: 'password123',
      },
      {
        email: 'lucas@gmail.com',
        password: 'password123',
      },
      {
        email: 'marcelo@uol.com.br',
        password: 'password123',
      },
      {
        email: 'juliana@gmail.com',
        password: 'password123',
      },
      {
        email: 'antonia@bol.com',
        password: 'password123',
      },
      {
        email: 'violet@gmail.com',
        password: 'password123',
      },
      {
        email: 'theo@gmail.com',
        password: 'password123',
      },
      {
        email: 'enzo@gmail.com',
        password: 'password123',
      },
      {
        email: 'jose.defin@hotmail.com',
        password: 'password123',
      },
      {
        email: 'marcela.defin@gmail.com',
        password: 'password123',
      },
      {
        email: 'thiago.silva@hotmail.com',
        password: 'password123',
      },
      {
        email: 'lu@gmail.com',
        password: 'password123',
      },
      {
        email: 'renata@gmail.com',
        password: 'password123',
      },
      {
        email: 'marcus@bol.com',
        password: 'password123',
      },
      {
        email: 'tadeu@gmail.com',
        password: 'password123',
      },
      {
        email: 'cris@hotmail.com',
        password: 'password123',
      },
      {
        email: 'junior@gmail.com',
        password: 'password123',
      },
      {
        email: 'jose.silva@hotmail.com',
        password: 'password123',
      },
      {
        email: 'denilson@gmail.com',
        password: 'password123',
      },
      {
        email: 'ivan@hotmail.com',
        password: 'password123',
      },
    ])

    await Promise.all(
      users.map(async (user) => {
        await Profile.create({
          userId: user.id,
          fullName: user.email.split('@')[0],
          avatarOptions: JSON.stringify({
            accessory: 'shades',
            body: 'chest',
            circleColor: 'blue',
            clothing: 'naked',
            clothingColor: 'green',
            eyebrows: 'leftLowered',
            eyes: 'normal',
            faceMask: false,
            faceMaskColor: 'red',
            facialHair: 'none2',
            graphic: 'redwood',
            hair: 'bob',
            hairColor: 'blue',
            hat: 'none',
            hatColor: 'red',
            lashes: true,
            lipColor: 'pink',
            mask: true,
            mouth: 'open',
            skinTone: 'brown',
          }),
        })
      })
    )
  }
}
