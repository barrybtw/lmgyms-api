import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

import 'dotenv/config';

export const env = createEnv({
  server: {
    PORT: z.coerce.number().positive().default(5454),
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: process.env,
});
