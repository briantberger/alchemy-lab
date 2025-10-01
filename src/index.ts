import Fastify from "fastify";
import cors from "@fastify/cors";
import prisma from "./plugins/prisma.ts";
import healthRoutes from "./routes/health/health.routes.ts";
import srdRoutes from "./routes/srd/srd.routes.ts";

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: true });

fastify.register(prisma);
fastify.register(healthRoutes);
fastify.register(srdRoutes, { prefix: "/srd" });

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
