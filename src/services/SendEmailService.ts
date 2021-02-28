import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

class SendEmailService {
   private client: Transporter

   constructor() {//O constructor ele é um metodo que é executado assim que um classe é instanciada 

      nodemailer.createTestAccount().then(account => {

         const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
               user: account.user, // generated ethereal user
               pass: account.pass, // generated ethereal password
            },
         })

         this.client = transporter
      })
   }
   async execute(to: string, subject: string, variables: object, path: string) {

      // console.log(variables)
      const templateFileContent = fs.readFileSync(path).toString("utf-8")

      const emailTemplateParse = handlebars.compile(templateFileContent)

      const html = emailTemplateParse({ variables })

      const message = await this.client.sendMail({
         to,
         subject,
         html,
         from: "NPS <noreplay@nps.com.br>"
      })
      // console.log("html:", html)
      console.log("Message sent: %s", message.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));

   }

}
export default new SendEmailService()