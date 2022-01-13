import { createTransport } from 'nodemailer'

const transporter = createTransport({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore This works according to docs, wrong types?
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
