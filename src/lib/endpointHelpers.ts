import type { JSONString, ReadOnlyFormData } from '@sveltejs/kit/types/helper'
import type { ServerRequest as SvelteKitServerRequest, ServerResponse } from '@sveltejs/kit/types/hooks'
import type { EndpointOutput, RequestHandler as SvelteKitRequestHandler } from '@sveltejs/kit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestLocals = Record<string, any>
export type RequestHandler = SvelteKitRequestHandler<RequestLocals, FormData>
type ServerRequest = SvelteKitServerRequest<RequestLocals, FormData>

export class EndpointError extends Error {
	constructor(message: string, public name: string, public statusCode: number) {
		super(message)

		if (import.meta.env.DEV) {
			Error.captureStackTrace(this, this.constructor)
		}
	}

	toResponse(): ServerResponse {
		return { headers: {}, status: this.statusCode, body: JSON.stringify({ error: this }) }
	}
}

export class EmptyFormFieldError extends EndpointError {
	constructor(public field: string) {
		super(`'${field}' was not provided`, 'missingField', 400)
	}
}

export function getFormField(form: ReadOnlyFormData, field: string): string {
	const value = form.get(field)
	if (!value) {
		throw new EmptyFormFieldError(field)
	}

	return value
}

export class InvalidBodyError extends EndpointError {
	constructor() {
		super('Request body undefined or not a form', 'invalidBody', 400)
	}
}

export function assertFormBody(req: ServerRequest): void {
	const [contentType] = req.headers['content-type'].split(';')
	if (!req.body || !contentType || (contentType !== 'multipart/form-data' && contentType !== 'application/x-www-form-urlencoded')) {
		throw new InvalidBodyError()
	}
}

export function errorResponse(
	status: number,
	error: { name: string; message: string } & Record<string, JSONString>,
	headers: Record<string, string | string[]> = {},
): EndpointOutput {
	return { status, body: { error }, headers }
}
