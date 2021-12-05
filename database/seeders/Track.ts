import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Lesson from 'App/Models/Lesson'
import Track from 'App/Models/Track'

export default class TrackSeeder extends BaseSeeder {
  public async run() {
    const tracks = await Track.createMany([
      {
        title: 'HTML',
        photoUrl: 'https://logodownload.org/wp-content/uploads/2016/10/html5-logo-9.png',
        description: 'Aprenda HTML de sforma simples e rápida',
      },
      {
        title: 'CSS',
        photoUrl: 'https://logospng.org/download/css-3/logo-css-3-2048.png',
        description: 'Aprenda o CSS para estilizar sua página',
      },
      {
        title: 'JavaScript',
        photoUrl: 'https://logospng.org/download/javascript/logo-javascript-icon-1024.png',
        description: 'Aprenda JavaScript para fazer ações em sua página',
      },
      {
        title: 'React',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
        description: 'Aprenda React para desenvolver páginas SPA para web',
      },
      {
        title: 'React Native',
        photoUrl:
          'https://fei.edu.br/~gwachs/disciplinas/CC4670/slides/Aula05/slides/images/react_native_logo.png',
        description: 'Aprenda React Native para desenvolver mobile nativo',
      },
    ])

    await Promise.all(
      tracks.map(async (track) => {
        if (track.id === 1) {
          await Lesson.createMany([
            {
              trackId: track.id,
              title: 'História da internet',
              description: 'Entenda como surgiu a internet e os problemas que ela veio resolver.',
              content: 'https://www.youtube.com/watch?v=rsFCVjr5yxc',
            },
            {
              trackId: track.id,
              title: 'História do HTML',
              description: 'Entenda como surgiu o HTML e como ele foi padronizado.',
              content: 'https://www.youtube.com/watch?v=NSmapCNcSyI&t',
            },
            {
              trackId: track.id,
              title: 'Como Funciona a Internet',
              description: 'Entenda como funciona a internet nos dias atuais.',
              content: 'https://www.youtube.com/watch?v=LMfeZ6XD0No',
            },
            {
              trackId: track.id,
              title: 'Primeiro Exemplo em HTML5',
              description: 'Aprenda na prática com um exemplo sobre HTML.',
              content: 'https://www.youtube.com/watch?v=yCSSsBNBzso',
            },
          ])
        }
        if (track.id === 2) {
          await Lesson.createMany([
            {
              trackId: track.id,
              title: 'O que é o CSS3?',
              description: 'Entenda o que é CSS e o porque utiliza-ló.',
              content: 'https://youtu.be/FRhM6sMOTfg',
            },
            {
              trackId: track.id,
              title: 'Aplicando CSS e Sintaxe',
              description: 'Aplique na prática o CSS e aprenda sua sintaxe',
              content: 'https://youtu.be/JOz8I_EWve8',
            },
            {
              trackId: track.id,
              title: 'CSS Flexbox',
              description: 'Entenda o que é a feature flex box e como utiliza-lá.',
              content: 'https://youtu.be/326-B1avuYo',
            },
            {
              trackId: track.id,
              title: 'Flexbox e Grid Layout',
              description: 'Finalize a imerssão em flexbox e entend ao grid layout.',
              content: 'https://www.youtube.com/watch?v=x-4z_u8LcGc',
            },
            {
              trackId: track.id,
              title: 'CSS Grid',
              description: '',
              content: 'https://www.youtube.com/watch?v=HN1UjzRSdBk',
            },
          ])
        }
        if (track.id === 3) {
          await Lesson.createMany([
            {
              trackId: track.id,
              title: 'O que o JavaScript é capaz de fazer?',
              description: 'O que é JavaScript (JS) e o que fazer com ele.',
              content: 'https://www.youtube.com/watch?v=Ptbk2af68e8',
            },
            {
              trackId: track.id,
              title: 'Revisão do HTML e CSS',
              description: '',
              content: 'https://www.youtube.com/watch?v=rUTKomc2gG8',
            },
            {
              trackId: track.id,
              title: 'Primeiros passo com JavaScript',
              description: 'Nessa aula vamos fazer nosso famoso hello world.',
              content: 'https://www.youtube.com/watch?v=FdePtO5JSd0',
            },
            {
              trackId: track.id,
              title: 'Primeiro script em JavaScript',
              description: 'Nessa aula vamos criar um script em JavaScript.',
              content: 'https://www.youtube.com/watch?v=OmmJBfcMJA8',
            },
            {
              trackId: track.id,
              title: 'Variáveis e Tipos Primitivos',
              description: 'Aprenda varáveis e tipos em JS',
              content: 'https://www.youtube.com/watch?v=Vbabsye7mWo',
            },
            {
              trackId: track.id,
              title: 'Tratamento de dados',
              description: '',
              content: 'https://www.youtube.com/watch?v=OJgu_KCCUSY',
            },
          ])
        }
        if (track.id === 4) {
          await Lesson.createMany([
            {
              trackId: track.id,
              title: 'Configurando ambiente de desenvolvimento',
              description: 'Configure sua máquina para desenvolver em React.',
              content: 'https://youtu.be/rHcmZQ2n2cQ',
            },
            {
              trackId: track.id,
              title: 'Hello world em React',
              description: 'Aprenda a fazer um hello world com React.',
              content: 'https://youtu.be/NfCgYreubP4',
            },
            {
              trackId: track.id,
              title: 'Criando contador na prática',
              description: 'Desenvolvendo um contador em React.',
              content: 'https://youtu.be/d5I0nQEyAnw',
            },
            {
              trackId: track.id,
              title: 'Componentização',
              description: 'Entenda sobre componentização e como ela funciona em React.',
              content: 'https://youtu.be/rBRfQHRnhL0',
            },
            {
              trackId: track.id,
              title: 'Criando componentes',
              description: 'Crie os componentes do zero.',
              content: 'https://youtu.be/LzwE6vixNBU',
            },
            {
              trackId: track.id,
              title: 'Props',
              description: 'Aprenda sobre props e como passar entre os componentes.',
              content: 'https://youtu.be/eQV-UV0oz9k',
            },
          ])
        }
        if (track.id === 5) {
          await Lesson.createMany([
            {
              trackId: track.id,
              title: 'Configurando ambiente de desenvolvimento',
              description: 'Configure sua máquina para desenvolver em React Native.',
              content: 'https://youtu.be/DmUUsTC2YkA',
            },
            {
              trackId: track.id,
              title: 'Criando sua primeira aplicação Mobile',
              description: 'Crie sua primeira aplicação mobile com React Native.',
              content: 'https://youtu.be/x0REBOkc2CQ',
            },
            {
              trackId: track.id,
              title: 'Criando contador na prática',
              description: 'Desenvolvendo um contador em React.',
              content: 'https://youtu.be/d5I0nQEyAnw',
            },
            {
              trackId: track.id,
              title: 'Estilos e estruturação de pastas',
              description: '',
              content: 'https://youtu.be/hV9Za1uCG5c',
            },
            {
              trackId: track.id,
              title: 'Props',
              description: 'Aprenda sobre props e como passar entre os componentes.',
              content: 'https://youtu.be/Q2hn47l2D3M',
            },
            {
              trackId: track.id,
              title: 'Estados',
              description: 'Aprenda a utilizar estados.',
              content: 'https://youtu.be/6_ufYgxpPmg',
            },
          ])
        }
      })
    )
  }
}
