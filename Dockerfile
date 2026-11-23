# syntax=docker/dockerfile:1
ARG NODE_IMAGE=node:24-bookworm-slim

##################################
# 1) BASE (deps)                 #
##################################
FROM ${NODE_IMAGE} AS base
WORKDIR /app

RUN chown -R node:node /app

USER node

COPY --chown=node:node package*.json .npmrc ./
RUN --mount=type=secret,id=npmrc,target=/home/node/.npmrc,uid=1000,gid=1000,mode=0400,required=true npm ci

COPY --chown=node:node . .

##################################
# 2) DEV (hot-reload Nuxt)       #
##################################
FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npx", "nuxt", "dev", "--host", "0.0.0.0", "--port", "3000"]

##################################
# 3) BUILD (static generation)   #
##################################
FROM base AS build
ENV NODE_ENV=production
RUN npm run generate

##################################
# 4) PROD (static preview)       #
##################################
FROM nginx:alpine AS prod
COPY --from=build /app/.output/public /usr/share/nginx/html
COPY docker/40-runtime-config.sh /docker-entrypoint.d/40-runtime-config.sh
RUN chmod +x /docker-entrypoint.d/40-runtime-config.sh
EXPOSE 80
