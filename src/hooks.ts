import { verify } from '$lib/jwt'
import { DatabaseError } from '$lib/database'
import { assertFormBody, EndpointError } from '$lib/endpointHelpers'
import { AUTH_TOKEN_MAX_AGE } from './routes/auth/login'
import type { RequestLocals } from '$lib/endpointHelpers'

import { parse } from 'cookie'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle<RequestLocals, FormData> = async ({ request, resolve }) => {
	try {
		const { auth } = parse(request.headers.cookie || '')
		const { payload } = await verify(auth, { audience: 'api', maxTokenAge: AUTH_TOKEN_MAX_AGE })

		request.locals = {
			authorized: true,
			payload,
			auth,
		}
	} catch (err) {
		if (request.url.pathname.startsWith('/api')) {
			return {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Bearer',
				},
				body: JSON.stringify({ error: { name: 'unauthorized', message: 'Please login' } }),
			}
		}
	}

	try {
		if (request.method === 'POST') {
			assertFormBody(request)
		}

		return await resolve(request)
	} catch (error) {
		console.error(error)

		if (error instanceof EndpointError) {
			return error.toResponse()
		}

		if (error instanceof DatabaseError) {
			return {
				status: 400,
				headers: {},
				body: JSON.stringify({ error: { name: 'dataError', message: 'Invalid input data' } }),
			}
		}

		return { status: 500, headers: {}, body: JSON.stringify({ error }) }
	}
}
