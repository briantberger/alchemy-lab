import type { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

export async function getHealthObject(prisma: PrismaClient) {
  try {
    const healthCheck = await prisma.healthCheck.create({
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
    return {
      status: "error",
      service: "dnd-api",
      database: "disconnected",
      time: new Date().toISOString(),
    };
  }
}
