import { createJWT } from '$lib/jwt'
import { query } from '$lib/database'
import { getCustomPayload, verify } from '$lib/jwt'
import { errorResponse } from '$lib/endpointHelpers'
import mail from '$lib/mail'
import type { RequestHandler } from '$lib/endpointHelpers'

import type SMTPTransport from 'nodemailer/lib/smtp-transport'

const AUDIENCE = 'api:email-verification'
const EXPIRATION_TIME = '1 hour'

export async function sendVerificationEmail(email: string, origin: string): Promise<SMTPTransport.SentMessageInfo> {
	const jwt = await createJWT({ email }).setExpirationTime(EXPIRATION_TIME).setAudience(AUDIENCE).sign()
	const address = `${origin}/email-verification?t=${jwt}`

	return await mail.sendMail({
		to: email,
		subject: 'Verify your email address',
		text: address,
	})
}

export const post: RequestHandler = async req => {
	const email = req.body.get('email')
	if (email) {
		await sendVerificationEmail(email, req.url.origin)

		return {}
	}

	const token = req.body.get('token')
	if (token) {
		const { payload } = await verify(token, { audience: AUDIENCE, maxTokenAge: EXPIRATION_TIME })
		const { email } = getCustomPayload<{ email: string }>(payload)

		await query({
			text: 'update accounts_base set has_verified_email = true where email = $1',
			values: [email],
		})

		return {}
	}

	return errorResponse(400, { name: 'invalidEmailResetPayload', message: 'No email or reset token provided' })
}
