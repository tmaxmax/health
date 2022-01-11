import { verify } from '$lib/jwt'
import { DatabaseError } from '$lib/database'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle<RequestLocals> = async ({ request, resolve }) => {
	if (request.url.pathname.startsWith('/api')) {
		try {
			const [scheme, token] = request.headers.authorization.split(' ')
			if (scheme.toLowerCase() !== 'bearer') {
				throw new Error(`Invalid authorization scheme '${scheme}'`)
			}

			const { payload } = await verify(token, { audience: 'api', maxTokenAge: '1 day' })

			request.locals = {
				authorized: true,
				payload,
				token,
			}
		} catch (err) {
			return {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Bearer',
				},
				body: JSON.stringify({ error: 'unauthorized', message: 'Please login' }),
			}
		}
	}

	try {
		return await resolve(request)
	} catch (err) {
		console.error(err)

		if (err instanceof DatabaseError) {
			return {
				status: 400,
				headers: {},
				body: JSON.stringify({ error: 'dataError', message: 'Invalid input data' }),
			}
		}

		const body = { error: 'internalError', message: 'An internal error occured' }
		if (err instanceof Error) {
			body.message = err.message
		}

		return { status: 500, headers: {}, body: JSON.stringify(body) }
	}
}
