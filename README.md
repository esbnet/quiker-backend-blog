# Quiker Artigos
(API)

Esta aplicação se propõe a ser um site de notícias compartilhado. Nele qualquer pesso podera se cadastrar e criar artigos que ficaram disponíveis ao público da internet. 

Para utilizá-lo, basta registrar-se no aplicativo e já será hapto a realizar postage, commentários em postagens de terceiros e dar manutenção em seus próprios comentários, como excluír, por exemplo.

## Techs

- Typescript 5.1
- Fastify - 4.21
- Prisma - 5.22
- Zod - 3.21
- Eslint - 8.46
- Vitest 0.33
- Supertest - 6.3

## Pré-requisitos

- Node (20.0 - utilizado)
- Genrenciador de pacotes (npm, pnpm, yarn)
- Gerenciador de Banco de Dados
- Configurar banco de dados

## Impantação

### Clonar projeto 

Em uma pasta no seu ambiente, clone o projeto com o comando:

``` 
git clone https://github.com/esbnet/quiker-backend-blog.git 
```
- Instalar dependências
```
npm install
```

### Configurar ambiente
Criar um arquivo .env na pasta raíz do projeto e inserir as variáveis de ambiente abaixo:
(ver modelo na pasta root, arquivo env.sample) 
Define o ambiente de execução, a porta onde a API irá rodar, a string de conexção com o db e uma string quer servirá de base para gerar o JWT na amplicação, respectivamente.
(estamos utilizando postgress - [ver documentação do prisma](https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres))

### Criar tabelas no banco de dados
Após criação do banco e configuração da string de conexão iremos rodar o comando. Altamente recomendado consultar a documetação do desenvolvedor [aqui](https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres).

```
npx prisma migrate dev --name init
```
### Rodando a API

Com todo o ambiente devidamente configurado, rode o comando abaixo e teremos nossa api executando e pronta pra receber requisições.
```
npm run start:dev
```

### Endoins