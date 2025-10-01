import { FastifyReply, FastifyRequest } from "fastify";
import { getHealthObject } from "./health.service.ts";

type Params = {
  type: string;
  index: string;
};

export async function getHealthHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { type, index } = request.params;

  try {
    const data = await getHealthObject(request.server.prisma);
    return reply.send(data);
  } catch (err) {
    request.log.error("Database health check failed:", err);
    reply.code(500);
  }
}
