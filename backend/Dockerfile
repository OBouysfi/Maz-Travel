FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
COPY prisma ./prisma
RUN npm install && npx prisma generate
EXPOSE 5000
CMD ["sh", "-c", "npx prisma migrate deploy 2>&1; node prisma/seed.js 2>&1; npx nodemon src/server.js"]