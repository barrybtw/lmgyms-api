import fastify from 'fastify';
import 'dotenv/config';
import { env } from './utils/env.mjs';
import { logger } from './utils/logger.mjs';
import { UserRoutes } from './routes/user/user.route.mjs';

import { db } from './utils/drizzle.db.mjs';
import { user } from './utils/drizzle.schema.mjs';

const App = fastify();

App.get('/ping', async (_request, _response) => {
  const res = await db.select().from(user).limit(1).execute();
  return { status: 'OK' };
});

App.register(UserRoutes, { prefix: '/user' });

const Main = async () => {
  App.listen({ port: env.PORT, host: '0.0.0.0' });
  logger.info(`Server listening on 0.0.0.0:${env.PORT}`);
};

Main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
