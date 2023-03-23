# Projeto para aprendizado de NestJS

Uma api que utiliza de geolocalização, verificações com data para checkins em academias.

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas (até 10km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado sobre administradores;
- [X] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);

## Documentação da API

#### Registra o usuário

```http
  POST /users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `Body - String` | **Obrigatório**. Nome do usuário. |
| `email` | `Body - String` | **Obrigatório**. Email do usuário. |
| `password` | `Body - String` | **Obrigatório**. Senha do usuário. Mínimo 6 caracteres. |

#### Autentica o usuário

```http
  POST /sessions
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `Body - String` | **Obrigatório**. Email do usuário. |
| `password` | `Body - String` | **Obrigatório**. Senha do usuário. |

#### Realiza refresh do access token

```http
  PATCH /token/refresh
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `refreshToken` | `Cookie - String` | **Obrigatório**. Refresh token do usuário. |

#### Todas as rotas abaixo precisam que o usuário autentique

#### Retorna o perfil do usuário

```http
  GET /me
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |

#### Retorna a lista de academias buscando por nome

```http
  GET /gyms/search
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `query` | `Query - String` | **Obrigatório**. Nome da academia. |
| `page` | `Query - Number` | Número da página atual. |

#### Retorna a lista de academias próximas

```http
  GET /gyms/nearby
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `latitude` | `Query - Number` | **Obrigatório**. Latitude do usuário. |
| `longitude` | `Query - Number` | **Obrigatório**. Longitude do usuário. |

#### Cria uma nova academia - Usado apenas por admins

```http
  POST /gyms
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `name` | `Body - String` | **Obrigatório**. Nome da academia. |
| `description` | `Body - String` | Descricão da academia. |
| `phone` | `Body - String` | Telefone da academia. |
| `latitude` | `Body - Number` | **Obrigatório**. Latitude da academia. |
| `longitude` | `Body - Number` | **Obrigatório**. Longitude da academia. |

#### Busca pelo histórico de check-ins de um usuário

```http
  GET /check-ins/history
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `page` | `Query - Number` | Número da página atual. |

#### Busca as métricas do usuário

```http
  GET /check-ins/metrics
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |

#### Cria um novo check-in

```http
  POST /gyms/:gymId/check-ins
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `gymId` | `Query Param - String` | **Obrigatório**. Id da academia. |
| `latitude` | `Body - Number` | **Obrigatório**. Latitude do usuário. |
| `longitude` | `Body - Number` | **Obrigatório**. Longitude do usuário. |

#### Valida um check-in - Apenas por usuário com Admin

```http
  PATCH /check-ins/:checkInId/validate
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `checkInId` | `Query Param - String` | **Obrigatório**. Id do check-in. |

## Stack utilizada

**Back-end:** Node, Fastify, Knex, Vitest, zod, sqlite3, Prisma, bycript, supertest


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/brunomestanza/ignite-node.git
```

Entre no diretório do projeto

```bash
  cd ignite-node/transactions-api
```

Crie um arquivo .env e .env.test seguindo os arquivos de exemplo, como .env.example

Configuração do docker

```bash
  docker compose up -d
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

Para rodar os testes unitários

```bash
  npm run test
```

Para rodar os testes unitários porém monitorando alterações

```bash
  npm run test:watch
```

Para rodar os testes e2e

```bash
  npm run test:e2e
```

Para rodar os testes e2e porém monitorando alterações (antes, é importante rodar o teste e2e pra que o pretest:e2e rode também)

```bash
  npm run test:e2e:watch
```

Para rodar todos os testes com cobertura de testes

```bash
  npm run test:coverage
```

Para rodar todos os testes com UI

```bash
  npm run test:ui
```

