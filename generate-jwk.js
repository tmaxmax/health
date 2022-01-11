import * as jose from 'jose'
import * as fs from 'fs'

try {
	const alg = 'HS256'
	const key = await jose.generateSecret(alg)
	const jwk = await jose.exportJWK(key)

	const stream = fs.createWriteStream('.env', { flags: 'a' })

	stream.write(
		`JWK='${JSON.stringify({ alg, ...jwk })}'
`,
		console.error,
	)
} catch (err) {
	console.error(err)
}
