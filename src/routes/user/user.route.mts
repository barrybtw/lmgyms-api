import { type FastifyInstance } from 'fastify';

const UserRoutes = async (server: FastifyInstance) => {
  server.get('/me', (_, response) => {
    response.send({ allowed: true });
  });
};

export { UserRoutes };
