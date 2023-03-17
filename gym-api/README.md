
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
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado sobre administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Documentação da API

#### Retorna todas as transações.

```http
  GET /transactions
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `sessionId` | `Cookie - String` | **Obrigatório**. Id da sessão. |

#### Retorna uma transação em específico.

```http
  GET /transactions/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `Query Param - String` | **Obrigatório**. Id da transação. |
| `sessionId` | `Cookie - String` | **Obrigatório**. Id da sessão. |

#### Retorna o resumo das transações, após os gastos e lucros.

```http
  GET /transactions/summary
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `sessionId` | `Cookie - String` | **Obrigatório**. Id da sessão. |

#### Cria uma transação.
```http
  POST /notifications
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `Body - String` | **Obrigatório**. Título da transação. |
| `amount` | `Body - Number` | **Obrigatório**. Valor da transação. |
| `type` | `Enum - 'credit', 'debit'` | **Obrigatório**. Tipo da transação. |

## Stack utilizada

**Back-end:** Node, Fastify, Knex, Vitest, zod, sqlite3


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

Para rodar os testes

```bash
  npm run test
```

