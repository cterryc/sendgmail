import { Router } from 'express'
import { bodyEmail } from '../controllers/index.controllers.js'

const sendEmail = Router()

sendEmail.post('/', bodyEmail)

export default sendEmail
