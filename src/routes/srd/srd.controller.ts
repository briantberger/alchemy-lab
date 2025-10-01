import { FastifyReply, FastifyRequest } from "fastify";
import { getSRDObject } from "./srd.service.ts";

type Params = {
  type: string;
  index: string;
};

export async function getSRDHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { type, index } = request.params;

  try {
    const data = await getSRDObject(request.server.prisma, type, index);
    return reply.send(data);
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ error: "Failed to fetch SRD object" });
  }
}
