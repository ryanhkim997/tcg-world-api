# syntax=docker/dockerfile:1

### Base image with Node and Yarn ###
ARG NODE_VERSION=22.16.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="NestJS/Prisma"
WORKDIR /app

ENV NODE_ENV=production
ARG YARN_VERSION=1.22.22
RUN npm install -g yarn@$YARN_VERSION --force


### Build stage ###
FROM base AS build

# Install dependencies for node-gyp and other native builds
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    openssl \
    pkg-config \
    python-is-python3

# Copy lockfiles and install ALL dependencies (incl. devDependencies)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Generate Prisma client
COPY prisma ./prisma
RUN yarn prisma generate

# Copy app source
COPY . .

# Build application (uses TypeScript)
RUN yarn build


### Final image for production runtime ###
FROM base

# Clean minimal install for runtime dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built app and Prisma client
COPY --from=build /app /app

# Expose default NestJS port
EXPOSE 3000

# Start app
CMD ["yarn", "start:prod"]