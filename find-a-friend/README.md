# Projeto para aprendizado de NestJS

Uma api que utiliza de geolocalização, verificações com data para checkins em academias.

## Regras da aplicação

[ ] Deve ser possível cadastrar um pet
[ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[ ] Deve ser possível filtrar pets por suas características
[ ] Deve ser possível visualizar detalhes de um pet para adoção
[ ] Deve ser possível se cadastrar como uma ORG
[ ] Deve ser possível realizar login como uma ORG

## Regras de negócio

[ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
[ ] Uma ORG precisa ter um endereço e um número de WhatsApp
[ ] Um pet deve estar ligado a uma ORG
[ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[ ] Todos os filtros, além da cidade, são opcionais
[ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### Informações sobre o pet
O pet possui
- Nome
- Sobre
- Idade (Filhote, Jovem, Adulto)
- Porte do animal (Pequenino, Médio ou Grande)
- Nível de energia (Muito baixa, Baixa, Média, Alta, Muito alta)
- Ambiente (Amplo, Médio, Pequeno)
- Nível de indepêndencia (Baixo (precisa de companhia sempre), Médio (precisa de companhia moderada), Alto (precisa de companhia constante))
- Tipo (Cachorro, Gato e Peixe)
- ORG
- Requisitos para adoção

### Informações sobre uma ORG
A ORG possui
- Nome do responsável
- Email
- CEP
- Endereço
- Whatsapp
- Senha

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

