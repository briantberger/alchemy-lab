import { FastifyInstance } from "fastify";
import { getHealthHandler } from "./health.controller.ts";

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get("/health", getHealthHandler);
}
