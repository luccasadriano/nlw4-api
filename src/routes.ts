import { Router } from 'express'
import { SurveysController } from './controllers/SurveysController'
import { UserController } from './controllers/UserControllers'

const router = Router()

const userControoller = new UserController()
const  surveysController = new SurveysController

router.get('/', (request, response) => {
   //1 param => Rota(Recurso API)
   //2 param => request, response
   return response.json({ message: "Hello World - NLW04" })
})
//USERS
router.post('/users', userControoller.create)
router.get('/users', userControoller.show)

//SURVEYS
router.post('/surveys', surveysController.create)
router.get('/surveys', surveysController.show)


export { router }