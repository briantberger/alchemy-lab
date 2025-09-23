import "dotenv/config"; // Add this at the top
import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: true }); // allow FE dev server

fastify.get("/health", async (_req, reply) => {
  return { status: "ok", service: "dnd-api", time: new Date().toISOString() };
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
