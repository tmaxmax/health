import { transact } from '$lib/database'
import { createJWT } from '$lib/jwt'
import mail from '$lib/mail'
import { AUDIENCE as VERIFY_AUDIENCE } from './verify'

import { hash } from 'bcrypt'

import type { RequestHandler } from '@sveltejs/kit'
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper'

const ACCOUNT_TYPES = ['family_medic', 'hospital_manager'] as const

type AccountType = typeof ACCOUNT_TYPES[number]

class EmptyFormFieldError extends Error {
	constructor(public field: string) {
		super(`'${field}' was not provided`)
	}
}

class EmailAlreadyExistsError extends Error {
	constructor(public email: string) {
		super(`There already exists an account with the email '${email}'`)
	}
}

class InvalidAccountTypeError extends Error {
	constructor(public type: string) {
		super(`'${type}' is an invalid account type`)
	}
}

const getFormField = (form: ReadOnlyFormData, field: string): string => {
	const value = form.get(field)
	if (!value) {
		throw new EmptyFormFieldError(field)
	}
	return value
}

function assertAccountType(type: string): asserts type is AccountType {
	if (!ACCOUNT_TYPES.includes(type as AccountType)) {
		throw new InvalidAccountTypeError(type)
	}
}

function isForm(contentType: string): boolean {
	;[contentType] = contentType.split(';')
	return contentType && (contentType === 'multipart/form-data' || contentType === 'application/x-www-form-urlencoded')
}

const SALT_ROUNDS = 10

export const post: RequestHandler<RequestLocals, FormData> = async req => {
	if (!req.body || !isForm(req.headers['content-type'])) {
		return { status: 400, body: { error: 'invalidBody', message: 'Missing body or invalid format' } }
	}

	try {
		const email = getFormField(req.body, 'email')
		const accountType = getFormField(req.body, 'kind')
		assertAccountType(accountType)
		const password = getFormField(req.body, 'password')
		const hashed = await hash(password, SALT_ROUNDS)

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
						req.body.get('residence') || '',
						req.body.get('occupation'),
						req.body.get('workplace'),
						req.body.get('education_level'),
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

		const jwt = await createJWT({ email }).setExpirationTime('1 hour').setAudience(VERIFY_AUDIENCE).sign()
		const address = `${req.url.origin}/auth/verify?t=${jwt}`

		await mail.sendMail({
			to: email,
			subject: 'Verify your email address',
			text: address,
		})
	} catch (err) {
		if (err instanceof EmptyFormFieldError) {
			return {
				status: 400,
				body: {
					error: 'missingField',
					field: err.field,
					message: err.message,
				},
			}
		}

		if (err instanceof EmailAlreadyExistsError) {
			return {
				status: 400,
				body: {
					error: 'emailAlreadyExists',
					email: err.email,
					message: err.message,
				},
			}
		}

		throw err
	}

	return { status: 204 }
}
