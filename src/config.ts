const env = process.env.NODE_ENV as 'production' | 'development' | 'test';

const databaseUrls = {
	production: process.env.DATABASE_URL_PRODUCTION,
	development: process.env.DATABASE_URL_DEVELOPMENT,
	test: process.env.DATABASE_URL_TEST,
} as const;

export const CONFIG = {
	env,
	database: { url: databaseUrls[env] as string },
};
