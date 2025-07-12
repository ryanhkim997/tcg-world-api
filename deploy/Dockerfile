# syntax = docker/dockerfile:1

# -------- Base stage --------
    ARG NODE_VERSION=22.16.0
    FROM node:${NODE_VERSION}-slim AS base
    
    LABEL fly_launch_runtime="NestJS/Prisma"
    
    ARG YARN_VERSION=1.22.22
    RUN npm install -g yarn@$YARN_VERSION --force
    
    # -------- Build stage --------
    FROM base AS build
    
    # Install build dependencies
    RUN apt-get update -qq && \
        apt-get install --no-install-recommends -y \
        build-essential \
        node-gyp \
        openssl \
        pkg-config \
        python-is-python3
    
    # Copy package files and install all dependencies, including devDependencies
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile --production=false
    
    # Generate Prisma Client
    COPY prisma ./prisma
    RUN yarn prisma generate
    
    # Copy app source and build
    COPY . .
    RUN yarn build
    
    # -------- Final stage --------
    FROM base
    
    ENV NODE_ENV=production
    
    # Minimal runtime dependencies
    RUN apt-get update -qq && \
        apt-get install --no-install-recommends -y openssl && \
        rm -rf /var/lib/apt/lists/* /var/cache/apt/archives
    
    # Copy compiled app and installed deps
    COPY --from=build /app /app
    
    EXPOSE 3000
    CMD ["yarn", "start:prod"]
    