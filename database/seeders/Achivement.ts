import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Achivement from 'App/Models/Achivement'

export default class AchivementSeeder extends BaseSeeder {
  public async run() {
    Achivement.createMany([
      {
        title: 'Primeira aula',
        photoUrl:
          'https://www.cidadeemnoticias.com.br/v1/wp-content/uploads/2017/10/Premio_-_-.png',
        description: 'Conquista de primeira aula.',
      },
      {
        title: 'Primeira trilha',
        photoUrl:
          'https://images.vexels.com/media/users/3/129154/isolated/preview/a9b2c4b91e649bf6c2b7de555015d668-medalha-de-laurel-em-1-lugar.png',
        description: 'Conquista de primeira trilha concluída.',
      },
      {
        title: 'Foco',
        photoUrl: 'https://i.pinimg.com/originals/20/fe/05/20fe0589c8cdab0ae938d11a3f6d3a2c.png',
        description: 'Conquista de foco por fazer várias aulas em seguida',
      },
      {
        title: 'Quase lá',
        photoUrl:
          'https://evolutto.com/wp-content/uploads/2020/08/maxima-performance-no-atendimento-digital-min.png',
        description: 'Conquista por estar no top do ranking',
      },
      {
        title: 'Top 1',
        photoUrl: 'https://www.paginamagica.com.br/_theme/imagens/top1.png',
        description: 'Conquista por ter chegado no top 1 do ranking',
      },
    ])
  }
}
