# Docker Setup

## Iniciar aplicação com Docker

```bash
# Subir todos os serviços (banco + API)
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Parar serviços
docker-compose down

# Parar e remover volumes (limpa banco de dados)
docker-compose down -v
```

## Serviços

- **PostgreSQL**: `localhost:5432`
  - User: `docker`
  - Password: `docker`
  - Database: `apiquiker`

- **API**: `localhost:3333`

## O que acontece ao subir

1. PostgreSQL inicia e aguarda estar saudável
2. API aguarda PostgreSQL estar pronto
3. Executa migrations (`prisma migrate deploy`)
4. Executa seeds (`prisma db seed`)
5. Inicia aplicação em modo dev

## Comandos úteis

```bash
# Rebuild da API
docker-compose up -d --build api

# Acessar shell do container
docker-compose exec api sh

# Executar migrations manualmente
docker-compose exec api npx prisma migrate deploy

# Executar seeds manualmente
docker-compose exec api npx prisma db seed

# Ver logs do banco
docker-compose logs -f postgres
```
