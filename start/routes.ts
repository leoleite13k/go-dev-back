/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { status: 'ON' }
})

Route.post('/signUp', 'AuthController.signUp')
Route.post('/signIn', 'AuthController.signIn')
Route.group(() => {
  Route.resource('profiles', 'ProfilesController').apiOnly()
  Route.resource('userAchivements', 'UserAchivementsController').apiOnly()
  Route.resource('achivements', 'AchivementsController')
    .apiOnly()
    .except(['store', 'update', 'destroy'])
  Route.resource('tracks', 'TracksController').apiOnly().except(['store', 'update', 'destroy'])
  Route.resource('lessons', 'LessonsController').apiOnly().except(['store', 'update', 'destroy'])
  Route.resource('userTrackLessons', 'UserTrackLessonsController').apiOnly()
  Route.get('/ranking', 'RankingsController.index')
  Route.get('/journey', 'JourneysController.index')
  Route.get('/userTracks', 'UserTracksController.index')
}).middleware('auth')
Route.group(() => {
  Route.resource('achivements', 'AchivementsController').apiOnly().except(['index', 'show'])
  Route.resource('tracks', 'TracksController').apiOnly().except(['index', 'show'])
  Route.resource('lessons', 'LessonsController').apiOnly().except(['index', 'show'])
}).middleware(['auth', 'admin'])
