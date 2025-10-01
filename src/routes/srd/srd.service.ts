import type { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const API_BASE = "https://www.dnd5eapi.co/api";

export async function getSRDObject(
  prisma: PrismaClient,
  type: string,
  index: string,
) {
  // Check DB first
  const cached = await prisma.sRDObject.findUnique({
    where: { index },
  });

  if (cached) {
    return cached.data;
  }

  // Otherwise fetch from API
  const res = await fetch(`${API_BASE}/${type}/${index}`);
  if (!res.ok) {
    throw new Error(`5E API error: ${res.statusText}`);
  }
  const data = await res.json();

  // Store in DB
  await prisma.sRDObject.create({
    data: { index, type, data },
  });

  return data;
}
