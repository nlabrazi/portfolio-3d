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

# deps d'abord (cache)
COPY package*.json ./
RUN npm ci

# puis le reste
COPY . .

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

# meilleure pratique : copier package pour certaines libs runtime qui le lisent
# COPY --from=build /app/package.json ./package.json

COPY --from=build /app/.output ./.output
# COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
