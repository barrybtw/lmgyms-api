import { type FastifyInstance } from 'fastify';

const UserRoutes = async (server: FastifyInstance) => {
  server.get('/me', (request, response) => {});
};

export { UserRoutes };
