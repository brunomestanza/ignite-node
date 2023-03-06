
# Projeto para aprendizado de NestJS

Um projeto para estudo do framework fastify, com testes, e configuração do knex. A aplicação é feita para o envio de ganhos e despesas.

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

