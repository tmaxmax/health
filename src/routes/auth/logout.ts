import type { RequestHandler } from '$lib/endpointHelpers'
import { serialize } from 'cookie'
import { AUTH_COOKIE_CONFIG, AUTH_COOKIE_NAME } from './login'

export const post: RequestHandler = () => ({
	headers: {
		cookie: serialize(AUTH_COOKIE_NAME, '', { ...AUTH_COOKIE_CONFIG, maxAge: 0 }),
	},
})
