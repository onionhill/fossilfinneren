FROM node:26-alpine AS build
WORKDIR /app
RUN npm install -g corepack && corepack enable
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm build && pnpm prune --prod

FROM node:26-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY sql ./sql
COPY package.json ./
USER node
EXPOSE 4000
CMD ["node", "dist/server.js"]
