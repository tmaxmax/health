import { query } from '$lib/database'
import { errorResponse, getFormField, RequestHandler } from '$lib/endpointHelpers'
import { createJWT, getCustomPayload, verify } from '$lib/jwt'
import { sendMail } from '$lib/mail'
import { assertValidPassword, hashPassword } from './register'

const AUDIENCE = 'auth:password-reset'
const EXPIRATION_TIME = '1 hour'

export const post: RequestHandler = async req => {
	const { action } = req.params

	if (action === 'request') {
		const emailOrCNP = getFormField(req.body, 'emailOrCNP')
		const {
			rows: [{ email } = { email: undefined }],
		} = await query<{ email: string }>({
			text: 'select email from accounts where has_verified_email is true and (email = $1 or cnp = $1)',
			values: [emailOrCNP],
		})
		if (!email) {
			return errorResponse(400, { name: 'invalidPasswordResetRequest', message: 'Invalid email or CNP or email is not verified' })
		}

		const jwt = await createJWT({ email }).setAudience(AUDIENCE).setExpirationTime(EXPIRATION_TIME).sign()
		const address = `${req.url.origin}/password-reset?t=${jwt}`

		await sendMail({
			to: email,
			subject: 'Reset your password',
			html: `<a href="${address}">Click here to reset your password</a>`,
		})
	} else if (action === 'submit') {
		const token = getFormField(req.body, 'token')
		const { payload } = await verify(token, { audience: AUDIENCE, maxTokenAge: EXPIRATION_TIME })
		const { email } = getCustomPayload<{ email: string }>(payload)
		const password = getFormField(req.body, 'password')
		assertValidPassword(password)
		const hashed = hashPassword(password)

		await query({
			text: 'update accounts_base set password = $1 where email = $2',
			values: [hashed, email],
		})
	} else {
		return errorResponse(404, { name: 'notFound', message: `Password reset action '${action}' does not exist` })
	}

	return {}
}
