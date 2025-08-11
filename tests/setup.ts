import { execSync } from 'node:child_process';

let isSetupDone = false;

export async function setup() {
	if (isSetupDone) return;
	console.info('🚀 Starting PostgreSQL in memory for tests ...');
	try {
		execSync('docker compose --profile test down postgresql-test', {
			stdio: 'ignore',
		});
	} catch (error) {
		console.error(error);
	}

	execSync('docker compose --profile test up -d --wait postgresql-test', {
		stdio: 'ignore',
	});

	console.info('📊 Updating Database...');
	try {
		execSync('npm run db:push', { stdio: 'inherit' });
	} catch (error) {
		console.error('❌ Error update database:', error);
		throw error;
	}
	console.info('✅ Setup completed!');
	isSetupDone = true;
}

export async function teardown() {
	console.info('📊 Stopping PostgreSql...');
	try {
		execSync('docker compose --profile test down postgresql-test', {
			stdio: 'ignore',
		});
		console.info('✅ Cleanup concluded!');
	} catch (error) {
		console.error('❌ Cleanup error:', error);
	}
}
