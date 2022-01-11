import { createTransport } from 'nodemailer'

const transporter = createTransport({
	// @ts-ignore fuck you
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: import.meta.env.PROD,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
	pool: true,
})

await transporter.verify()

export default transporter
