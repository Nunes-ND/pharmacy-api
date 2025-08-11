import type { Config } from 'drizzle-kit';
import { CONFIG } from '@/config';

export default {
	out: './drizzle',
	schema: './src/database/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: CONFIG.database.url,
	},
} satisfies Config;
