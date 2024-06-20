import nodemailer from 'nodemailer'
import { env } from '@/env'

export const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
    },
})