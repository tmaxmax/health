import { query } from '$lib/database'
import { errorResponse, getFormField, RequestHandler } from '$lib/endpointHelpers'
import { createJWT } from '$lib/jwt'
import { compare } from 'bcrypt'
import { CookieSerializeOptions, serialize } from 'cookie'

type QueryResult = {
	id: number
	password: string
	has_verified_email: boolean
} & ({ kind: 'family_medic' | 'patient'; hospital: null } | { kind: 'hospital_medic' | 'hospital_manager'; hospital: number })

type CustomClaim = {
	id: number
	kind: QueryResult['kind']
	hospital?: number
}

export const AUTH_COOKIE_NAME = 'auth'
export const AUTH_COOKIE_CONFIG: CookieSerializeOptions = {
	httpOnly: true,
	path: '/',
	secure: import.meta.env.PROD,
	sameSite: 'strict',
}
export const AUTH_TOKEN_MAX_AGE = 60 * 60 * 24

export async function createAuthCookie(claims: CustomClaim): Promise<string> {
	const jwt = await createJWT(claims).setAudience('api').setExpirationTime(AUTH_TOKEN_MAX_AGE).sign()
	return serialize(AUTH_COOKIE_NAME, jwt, { ...AUTH_COOKIE_CONFIG, maxAge: AUTH_TOKEN_MAX_AGE })
}

export const post: RequestHandler = async req => {
	const emailOrCNP = getFormField(req.body, 'emailOrCNP')
	const password = getFormField(req.body, 'password')

	const {
		rows: [account],
	} = await query<QueryResult>({
		text: 'select id, password, has_verified_email, hospital, kind from accounts where email = $1 or cnp = $1',
		values: [emailOrCNP],
	})

	const errorResp = errorResponse(400, { name: 'authError', message: 'Invalid email, CNP or password' })

	if (!account) {
		return errorResp
	}

	try {
		const isCorrectPassword = await compare(password, account.password)
		if (!isCorrectPassword) {
			return errorResp
		}
	} catch {
		return errorResp
	}

	const customClaims: CustomClaim = { id: account.id, kind: account.kind }
	if (account.hospital) {
		customClaims.hospital = account.hospital
	}

	return { headers: { 'set-cookie': await createAuthCookie(customClaims) } }
}
