FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS dev
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY .env* ./
COPY . .
CMD ["pnpm", "dev"]

FROM base AS prod
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod
COPY .env* ./
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]
