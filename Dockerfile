# syntax=docker/dockerfile:1
ARG NODE_IMAGE=node:20-bullseye-slim

##################################
# 1) BASE (deps)                 #
##################################
FROM ${NODE_IMAGE} AS base
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*

RUN chown -R node:node /app

USER node

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

##################################
# 2) DEV (hot-reload Nuxt)       #
##################################
FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npx", "nuxt", "dev", "--host", "0.0.0.0", "--port", "3000"]

##################################
# 3) BUILD (prod build)          #
##################################
FROM base AS build
ENV NODE_ENV=production
RUN npm run build

##################################
# 4) PROD (runtime)              #
##################################
FROM ${NODE_IMAGE} AS prod
WORKDIR /app
ENV NODE_ENV=production

USER node

COPY --from=build --chown=node:node /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
