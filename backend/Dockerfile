FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl
ENV NODE_ENV=production
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev --ignore-scripts && npx prisma generate
COPY --from=builder /app/dist ./dist
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
