import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// If a valid Neon connection string is provided, connect directly
export const db = connectionString && !connectionString.includes('sample')
  ? drizzle(neon(connectionString), { schema })
  : (null as unknown as ReturnType<typeof drizzle<typeof schema>>);

export const hasLiveDatabase = Boolean(db);

export * from './schema';
