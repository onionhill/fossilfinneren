FROM node:26-alpine AS build
WORKDIR /app
RUN npm install -g corepack && corepack enable
COPY package.json ./
RUN pnpm install
COPY . .
ARG VITE_AUTH_MODE=feide
ARG VITE_API_URL=https://api.fossilfinneren.no
ENV VITE_AUTH_MODE=$VITE_AUTH_MODE VITE_API_URL=$VITE_API_URL
RUN pnpm build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
