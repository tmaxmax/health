import { query } from '$lib/database'
import { getCustomPayload, verify } from '$lib/jwt'
import type { RequestHandler } from '@sveltejs/kit'

export const AUDIENCE = 'auth:verify'

export const get: RequestHandler = async req => {
	const jwt = req.url.searchParams.get('t')

	const { payload } = await verify(jwt, { audience: AUDIENCE, maxTokenAge: '1 hour' })
	const { email } = getCustomPayload<{ email: string }>(payload)

	await query({
		text: 'update accounts_base set has_verified_email = true where email = $1',
		values: [email],
	})

	return { status: 204 }
}
