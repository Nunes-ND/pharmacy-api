import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	test: {
		globals: true,
		environment: 'node',
		pool: 'threads',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			reportsDirectory: './coverage',
			include: ['packages/**/src/**/*.ts'],
			exclude: ['packages/**/src/main.ts', 'packages/**/src/http/server.ts'],
			all: true,
		},
		passWithNoTests: true,
		env: loadEnv(mode, process.cwd(), ''),
		globalSetup: process.env.VITEST_GLOBAL_SETUP || undefined,
		projects: [
			{
				extends: true,
				test: {
					name: { label: 'unit', color: 'green' },
					include: ['tests/unit/**/*.test.ts'],
					poolOptions: {
						threads: {
							isolate: true,
							minThreads: 1,
							maxThreads: 4,
						},
					},
					globalSetup: process.env.VITEST_UNIT_SETUP || undefined,
				},
			},
			{
				extends: true,
				test: {
					name: { label: 'integration', color: 'yellow' },
					include: ['tests/integration/**/*.test.ts'],
					singleThread: true,
					globalSetup: process.env.VITEST_INTEGRATION_SETUP || undefined,
				},
			},
		],
	},
	plugins: [tsconfigPaths()],
	esbuild: {
		sourcemap: true,
	},
}));
