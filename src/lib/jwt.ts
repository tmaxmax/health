import { SignJWT, importJWK, jwtVerify, JWTPayload } from 'jose'
import type { JWTVerifyResult, JWTVerifyOptions } from 'jose'

const jwk = JSON.parse(process.env.JWK)
export const key = await importJWK(jwk)
export const ISSUER = 'https://health.com'

export function verify(jwt: string | Uint8Array, opts: Omit<JWTVerifyOptions, 'issuer'>): Promise<JWTVerifyResult> {
	return jwtVerify(jwt, key, { issuer: ISSUER, ...opts })
}

class JWT extends SignJWT {
	sign(): Promise<string> {
		return super.sign(key)
	}
}

export function createJWT(customPayload?: Record<string, unknown>): JWT {
	return new JWT({ [ISSUER]: customPayload }).setIssuedAt().setIssuer(ISSUER).setProtectedHeader({ alg: jwk.alg })
}

export function getCustomPayload<T extends Record<string, unknown> = Record<string, unknown>>(payload: JWTPayload): T {
	const custom = payload[ISSUER]
	if (typeof custom !== 'object') {
		throw new TypeError('Custom payload must be of object type')
	}

	return custom as T
}
