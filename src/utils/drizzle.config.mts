import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle.schema.mts',
  driver: 'pg',
  out: 'drizzle',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
