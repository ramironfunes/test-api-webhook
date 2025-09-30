FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apk add --no-cache bash curl netcat-openbsd

# Copiar el script al contenedor
COPY wait-for.sh /app/wait-for.sh
RUN chmod +x /app/wait-for.sh

EXPOSE 3000

CMD ["./wait-for.sh", "mongo:27017", "--", "node", "server.js"]
