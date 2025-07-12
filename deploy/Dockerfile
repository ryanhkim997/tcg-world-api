# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.16.0
FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app
LABEL fly_launch_runtime="NestJS/Prisma"

ARG YARN_VERSION=1.22.22
RUN npm install -g yarn@$YARN_VERSION --force

# -------------------------------------
# 🛠️ Build Stage
# -------------------------------------
FROM base AS build

# This line is crucial: ensures devDependencies are installed during build
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    openssl \
    pkg-config \
    python-is-python3

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma ./prisma
RUN yarn prisma generate

COPY . .
RUN yarn build

# -------------------------------------
# 🚀 Final Stage (for Deployment)
# -------------------------------------
FROM base AS final

# This stage is always production
ENV NODE_ENV=production

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY --from=build /app /app

EXPOSE 3000
CMD ["yarn", "start:prod"]
