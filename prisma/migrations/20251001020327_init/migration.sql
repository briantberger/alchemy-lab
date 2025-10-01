-- CreateTable
CREATE TABLE "public"."SRDObject" (
    "id" SERIAL NOT NULL,
    "index" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "lastFetched" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SRDObject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SRDObject_index_key" ON "public"."SRDObject"("index");

-- CreateIndex
CREATE INDEX "SRDObject_type_idx" ON "public"."SRDObject"("type");
