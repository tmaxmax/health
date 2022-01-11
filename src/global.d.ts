/// <reference types="@sveltejs/kit" />

declare type RequestLocals =
	| {
			authorized: true
			payload: import('jose').JWTPayload
			token: string
	  }
	| {
			authorized: false
			authorizationError: Error
	  }
