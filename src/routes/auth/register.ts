import { transact } from '$lib/database'
import { sendVerificationEmail } from './email-verification'
import { getFormField, EndpointError } from '$lib/endpointHelpers'
import type { RequestHandler } from '$lib/endpointHelpers'

import { hash } from 'bcrypt'

const ACCOUNT_TYPES = ['family_medic', 'hospital_manager'] as const

type AccountType = typeof ACCOUNT_TYPES[number]

class EmailAlreadyExistsError extends EndpointError {
	constructor(public email: string) {
		super(`There already exists an account with the email '${email}'`, 'emailAlreadyExists', 400)
	}
}

class InvalidAccountTypeError extends EndpointError {
	constructor(public type: string) {
		super(`'${type}' is an invalid account type`, 'invalidAccountType', 400)
	}
}

function assertAccountType(type: string): asserts type is AccountType {
	if (!ACCOUNT_TYPES.includes(type as AccountType)) {
		throw new InvalidAccountTypeError(type)
	}
}

export function assertValidPassword(pass: string): void {
	const length = Buffer.byteLength(pass)
	if (length < 8 || length > 72) {
		throw new EndpointError('Password too short or too long', 'invalidPassword', 400)
	}
}

export function hashPassword(pass: string): Promise<string> {
	return hash(pass, 10)
}

export const post: RequestHandler = async req => {
	const email = getFormField(req.body, 'email')
	const accountType = getFormField(req.body, 'kind')
	assertAccountType(accountType)
	const password = getFormField(req.body, 'password')
	assertValidPassword(password)
	const hashed = await hashPassword(password)

	await transact(async conn => {
		const {
			rows: [{ is_email_taken }],
		} = await conn.query<{ is_email_taken: boolean }>('select exists(select id from accounts_base where email = $1) as is_email_taken', [
			email,
		])

		if (is_email_taken) {
			throw new EmailAlreadyExistsError(email)
		}

		const {
			rows: [{ id: accountID }],
		} = await conn.query<{ id: number }>('insert into accounts_base (email, password) values ($1, $2) returning id', [email, hashed])

		if (accountType === 'family_medic') {
			const {
				rows: [{ id: personID }],
			} = await conn.query<{ id: number }>(
				'insert into people (cnp, name, birthday, citizenship, home, residence, occupation, workplace, education_level, ci_series, ci_number) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning id',
				[
					req.body.get('cnp'),
					req.body.get('name'),
					req.body.get('birthday'),
					req.body.get('citizenship'),
					req.body.get('home'),
					req.body.get('residence'),
					req.body.get('occupation'),
					req.body.get('workplace'),
					req.body.get('educationLevel'),
					req.body.get('ciSeries'),
					req.body.get('ciNumber'),
				],
			)

			await conn.query('insert into family_medics (account_id, person_id) values ($1, $2)', [accountID, personID])
		} else {
			const {
				rows: [{ id: hospitalID }],
			} = await conn.query<{ id: number }>('insert into hospitals (name, county, address) values ($1, $2, $3) returning id', [
				req.body.get('name'),
				req.body.get('county'),
				req.body.get('address'),
			])

			await conn.query('insert into hospital_managers (account_id, hospital_id) values ($1, $2)', [accountID, hospitalID])
		}
	})

	await sendVerificationEmail(email, req.url.origin)

	return {}
}
