import { createTransport } from 'nodemailer'
import type SMTPPool from 'nodemailer/lib/smtp-pool'

if (!process.env.SMTP_HOST) {
	throw new Error('SMTP host not provided')
} else if (!process.env.SMTP_PORT) {
	throw new Error('SMTP host not provided')
} else if (!process.env.SMTP_USER) {
	throw new Error('SMTP user not provided')
} else if (!process.env.SMTP_PASS) {
	throw new Error('SMTP pass not provided')
}

const port = parseInt(process.env.SMTP_PORT)
if (!port) {
	throw new Error('SMTP port is invalid')
}

const options: SMTPPool.Options = {
	host: process.env.SMTP_HOST,
	port,
	secure: import.meta.env.PROD,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
	pool: true,
}

const transporter = createTransport(options)

await transporter.verify()

export const sendMail = transporter.sendMail.bind(transporter)
