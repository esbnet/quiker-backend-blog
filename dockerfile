# API Dockerfile (coloque na pasta ./api/Dockerfile)
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY . .

# Gerar Prisma Client
RUN npx prisma generate 

EXPOSE 3000

CMD ["npm", "run", "start:dev"]