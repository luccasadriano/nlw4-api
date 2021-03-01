import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppError'
import { SurveysUsersRepository } from '../repositories/SuverysUsersRepository'

class AnswerController {

   //http://localhost:3333/ansewers/1?u=5055f473-b079-4360-b62d-bf2be7cb8059
   async execute(request: Request, response: Response) {
      const { value } = request.params//value String
      const { u } = request.query

      const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

      const surveyUser = await surveysUsersRepository.findOne({
         id: String(u) // u indo de request.query pode ser default, por isso estamos forçando ele ser uma string
      })

      if (!surveyUser) {
         throw new AppError("Survey User does not exists!")
      }

      surveyUser.value = Number(value)//tipo um parseInt, convertendo value string para number

      await surveysUsersRepository.save(surveyUser)

      return response.json(surveyUser)
   }
}
export { AnswerController }