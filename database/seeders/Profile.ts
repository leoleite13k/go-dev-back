import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile'

export default class ProfileSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'user_id'

    await Profile.updateOrCreateMany(uniqueKey, [
      {
        user_id: 1,
        name: 'Virk',
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=LongHairDreads&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=Tanned',
      },
      {
        user_id: 2,
        name: 'Ro',
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Sunglasses&hairColor=SilverGray&facialHairType=BeardMajestic&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=PastelRed&graphicType=Skull&eyeType=WinkWacky&eyebrowType=AngryNatural&mouthType=Eating&skinColor=Light',
      },
      {
        user_id: 3,
        name: 'Leo',
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Wayfarers&hatColor=Blue01&hairColor=SilverGray&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Blue01&graphicType=SkullOutline&eyeType=Hearts&eyebrowType=RaisedExcited&mouthType=Eating&skinColor=Light',
      },
    ])
  }
}
