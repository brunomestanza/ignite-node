
# Projeto para aprendizado básico de Node

Um projeto para estudo dos conceitos básicos do Node, como streams, formas de enviar parâmetros em requisições, possuindo um CRUD simples, com com inserção, busca, atualização e exclusão de recursos.
Além disso, possui a inclusão de dados através de CSV.
## Documentação da API

#### Retorna todos as tasks. Pode receber um filtro com o parâmetro search.

```http
  GET /tasks | GET /tasks?search=string
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `search` | `Query Param - String` | **Opcional**. Parâmetro para busca com filtro. |

#### Cria uma task.
```http
  POST /tasks
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `Body - String` | **Obrigatório**. Título da task. |
| `description` | `Body - String` | **Obrigatório**. Descrição da task. |

#### Atualiza uma task.
```http
  PUT /tasks/id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `Body - String` | **Opcional**. Título da task. |
| `description` | `Body - String` | **Opcional**. Descrição da task. |

#### Deleta uma task.
```http
  DELETE /tasks/id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `Route Param - String` | **Obrigatório**. ID da task. |

#### Marca uma tarefa como concluída ou remove essa marcação.
```http
  PUT /tasks/id/complete
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `Route Param - String` | **Obrigatório**. ID da task. |




## Uso de CSV

Para ser feito a criação de tasks baseada em CSV, é necessário rodar o projeto localmente, após isso usar o comando
```
node ./streams/import-csv.js
```
Isso faz com que para cada linha no arquivo CSV do projeto seja feita uma inserção no banco através da requisição POST.


## Stack utilizada

**Back-end:** Node, csv-parse


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/brunomestanza/ignite-node.git
```

Entre no diretório do projeto

```bash
  cd ignite-node/fundamentos-nodejs
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

