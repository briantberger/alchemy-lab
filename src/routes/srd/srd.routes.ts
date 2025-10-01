import { FastifyInstance } from "fastify";
import { getSRDHandler } from "./srd.controller.ts";

export default async function srdRoutes(fastify: FastifyInstance) {
  fastify.get("/:type/:index", getSRDHandler);
}
