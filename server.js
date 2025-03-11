import Fastify from 'fastify';
import middie from '@fastify/middie';
import cors from '@fastify/cors';
import { handler } from './build/handler.js';

const fastify = Fastify();
const port = 3000;

await fastify.register(cors, { 
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], 
  credentials: true 
});

await fastify.register(middie);
fastify.use(handler);

const start = async () => {
  try {
    await fastify.listen({ port });
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
