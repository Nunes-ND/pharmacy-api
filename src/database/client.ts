import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { CONFIG } from '@/config';
import * as schema from './schema';

const pool = new Pool({
	connectionString: CONFIG.database.url,
	ssl: CONFIG.env === 'production' ? { rejectUnauthorized: true } : false,
});

export const dbClient: NodePgDatabase<typeof schema> = drizzle(pool, {
	schema,
});
