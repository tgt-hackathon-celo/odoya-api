<h1 align="center">PROJETO-CELO-ACCESS-CONTROL-API</h1>

## :computer: Requisitos

[![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)]((https://nodejs.org/en//))
[![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/install/#install-compose)

## Descriçao

API controle de acesso PROJETO-CELO.

## Instalação

Acesse o diretório raiz da API e execute o comando.

```bash
$ npm install
```

## Preparar o ambiente

**1**. Acesse o diretório raiz da API e execute o comando abaixo:

``` sh
$ docker-compose up -d
```

**2**. Crie um arquivo `.env` na pasta raiz da API com o seguinte formato:

``` sh
PORT=4000
ENABLE_CORS=true
JWT_KEY=string
JWT_EXPIRATION=28800
NOSQL_CONNECTION_STRING=mongodb://cb:
PAYLOAD_KEY=string
SENDGRID_API_KEY=string
SENDGRID_EMAIL_SENDER=email
FRONTEND_BACKOFFICE_URL=http://localhost:4200
FIRST_ACCESS_ROUTE=/code
CHANGE_PASSWORD_ROUTE=/change-password
```

| Definition | Description |
| ---------- | ----------- |
| **PORT** | Porta em que a API será iniciada |
| **ENABLE_CORS** | Permite obter dados da mesma origem em que a API está sendo executada |
| **JWT_KEY** | Chave utilizada na criptografia do JWT |
| **JWT_EXPIRATION** | Tempo de expiração do token JWT |
| **NOSQL_CONNECTION_STRING** | Conexão para acesso do banco de dados |
| **PAYLOAD_KEY** | Chave utilizada na criptografia do payload. Deve ser compartilhada com quem consumirá a API |
| **SENDGRID_API_KEY** | Chave utilizada para envio de e-mails. |
| **SENDGRID_EMAIL_SENDER** | E-mail utilizado para o envio de mensagens. Feve ser cadastrado como sender no SENDGRID |
| **FRONTEND_BACKOFFICE_URL** | URL do backoffice frontend |
| **FIRST_ACCESS_ROUTE** | Rota para o primeiro acesso |
| **CHANGE_PASSWORD_ROUTE** | Rota para a troca da senha |

**3**. No diretório raiz da API execute o comando:

``` sh
$ npm run seed
```
Esse comando vai criar as roles e o usuário padrão.

- **Usuário:** 
- **Senha:** P@ssw0rd

## Executando a API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentação

Após executar a api acesse http://localhost:4000/docs

## Testes

```bash

# end to end tests
$ npm run test:e2e

# end to end test watch
$ npm run test:e2e:watch

# test coverage
$ npm run test:e2e:cov

```

## Suporte
