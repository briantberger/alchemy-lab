export async function healthRoutes(fastify) {
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
}
