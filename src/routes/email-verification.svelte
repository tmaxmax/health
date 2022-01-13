<script context="module" lang="ts">
	import type { ErrorResponse } from '$lib/endpointHelpers'
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ fetch, url }) => {
		if (!url.searchParams.has('token')) {
			return {
				status: 302,
				redirect: '/',
			}
		}

		const resp = await fetch('/auth/email-verification', {
			method: 'POST',
			body: url.searchParams,
		})

		if (!resp.ok) {
			const { error }: ErrorResponse = await resp.json()

			return {
				status: resp.status,
				error: error.message,
			}
		}

		return {
			status: 302,
			redirect: '/',
		}
	}
</script>
