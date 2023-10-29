import { contactEmail, emailReceiver } from '../helpers/index.helpers.js'

export const bodyEmail = (req, res) => {
  const { name, email, subject, company, job, password } = req.body
  const emailData = emailReceiver(name, email, subject, company, job, password) // retorna Objeto con los datos a enviar

  if (emailData.error) {
    console.log(emailData.error)
    return res.status(404).send({ error: emailData.error })
  } else {
    contactEmail.sendMail(emailData, (error) => {
      if (error) {
        res.status(500).json({ status: error })
      } else {
        res.status(200).json({ status: 'success' })
      }
    })
  }
}
