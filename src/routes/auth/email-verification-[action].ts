import { createJWT } from '$lib/jwt'
import { query } from '$lib/database'
import { getCustomPayload, verify } from '$lib/jwt'
import { errorResponse, getFormField } from '$lib/endpointHelpers'
import { sendMail } from '$lib/mail'
import type { RequestHandler } from '$lib/endpointHelpers'

import type SMTPTransport from 'nodemailer/lib/smtp-transport'

const AUDIENCE = 'api:email-verification'
const EXPIRATION_TIME = '1 hour'

export async function sendVerificationEmail(email: string, origin: string): Promise<SMTPTransport.SentMessageInfo> {
	const jwt = await createJWT({ email }).setExpirationTime(EXPIRATION_TIME).setAudience(AUDIENCE).sign()
	const address = `${origin}/email-verification?token=${jwt}`

	return await sendMail({
		to: email,
		subject: 'Verify your email address',
		text: address,
	})
}

export const post: RequestHandler = async req => {
	const { action } = req.params

	if (action === 'request') {
		await sendVerificationEmail(getFormField(req.body, 'email'), req.url.origin)
	} else if (action === 'submit') {
		const token = getFormField(req.body, 'token')
		const { payload } = await verify(token, { audience: AUDIENCE, maxTokenAge: EXPIRATION_TIME })
		const { email } = getCustomPayload<{ email: string }>(payload)

		await query({
			text: 'update accounts_base set has_verified_email = true where email = $1',
			values: [email],
		})
	} else {
		return errorResponse(404, { name: 'notFound', message: `Email verification action '${action}' does not exist` })
	}

	return {}
}
