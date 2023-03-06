
# Projeto para aprendizado de NestJS

Um projeto para estudo do framework NestJS, com aplicação de padronização de projetos, SOLID, DDD e TDD. A aplicação é feita para o envio de notificações.

Dentro da aplicação, por se tratar de algo feito pensando em microserviços, o usuário alvo da notificação, é chamado de recipiente.
## Documentação da API

#### Retorna a contagem de notificações para um recipiente em específico.

```http
  GET /notifications/count/from/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `recipientId` | `Query Param - String` | **Obrigatório**. Id do recipiente |

#### Retorna as notificações de um recipiente.

```http
  GET /notifications/from/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `recipientId` | `Query Param - String` | **Obrigatório**. Id do recipiente |

#### Cria uma notificação.
```http
  POST /notifications
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `content` | `Body - String` | **Obrigatório**. Conteúdo da notificação. |
| `category` | `Body - String` | **Obrigatório**. Categoria da notificação. |
| `recipientId` | `Body - String` | **Obrigatório**. ID da notificação em formato UUID v4. |

#### Cancela uma notificação.
```http
  PATCH /notifications/:id/cancel
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `recipientId` | `Query Param - String` | **Obrigatório**. Id do recipiente |

#### Marca uma notificação como lida.
```http
  PATCH /notifications/:id/read
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `recipientId` | `Query Param - String` | **Obrigatório**. Id do recipiente |

#### Marca uma notificação como não lida.
```http
  PATCH /notifications/:id/unread
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `recipientId` | `Query Param - String` | **Obrigatório**. Id do recipiente |

## Stack utilizada

**Back-end:** Node, NestJS, Prisma, Jest


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/brunomestanza/ignite-node.git
```

Entre no diretório do projeto

```bash
  cd ignite-node/notifications-service
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start:dev
```

Para rodar os testes

```bash
  npm run test
```

