import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.decorate("prisma", prisma);

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

await fastify.register(cors, { origin: true }); // allow FE dev server

fastify.get("/health", async (_req, reply) => {
  try {
    // Test database connection and create a health check record
    const healthCheck = await fastify.prisma.healthCheck.create({
      data: {
        status: "healthy",
      },
    });

    return {
      status: "ok",
      service: "dnd-api",
      database: "connected",
      recordId: healthCheck.id,
      time: healthCheck.createdAt,
    };
  } catch (error) {
    fastify.log.error("Database health check failed:", error);
    reply.code(500);
    return {
      status: "error",
      service: "dnd-api",
      database: "disconnected",
      time: new Date().toISOString(),
    };
  }
});

fastify.addHook("onClose", async () => {
  await prisma.$disconnect();
});

const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.PORT ?? 4000),
      host: "0.0.0.0",
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
