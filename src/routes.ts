import { Router } from 'express'
import { SendEmailController } from './controllers/SendEmailController'
import { SurveysController } from './controllers/SurveysController'
import { UserController } from './controllers/UsersControllers'


const router = Router()

const userControoller = new UserController()
const surveysController = new SurveysController()
const sendEmailController = new SendEmailController()

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

//SURVEYS-USERS
router.post("/sendEmail", sendEmailController.execute)



export { router }