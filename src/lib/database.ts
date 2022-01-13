import { Pool, DatabaseError } from 'pg'
import type { QueryConfig, ClientBase, QueryResult } from 'pg'

const pool = new Pool({ ssl: import.meta.env.PROD })

export function query<R, I extends unknown[] = unknown[]>(config: QueryConfig<I>): Promise<QueryResult<R>> {
	return pool.query(config)
}

export async function transact(run: (conn: ClientBase) => Promise<void>): Promise<void> {
	const conn = await pool.connect()

	try {
		await conn.query('BEGIN')
		await run(conn)
		await conn.query('COMMIT')
	} catch (err) {
		try {
			await conn.query('ROLLBACK')
		} catch (rollbackErr) {
			void rollbackErr
		}

		throw err
	} finally {
		conn.release()
	}
}

export { DatabaseError }
