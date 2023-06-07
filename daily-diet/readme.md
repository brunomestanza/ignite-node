# App

Daily Diet app

## RFs (Requisitos funcionais - Oque é possível fazer)
- [X] Deve ser possível se cadastrar
- [X] Deve ser possível se autenticar
- [X] Deve ser possível ver informações de um usuário
- [X] Deve ser possível registrar uma refeição feita, com nome, descrição, data e hora e se está dentro ou não da dieta
- [X] Deve ser possível editar uma refeição, alterando todos os seus dados
- [X] Deve ser possível apagar uma refeição
- [X] Deve ser possível listar todas as refeições de um usuário
- [X] Deve ser possível visualizar uma única refeição
- [X] Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência por dia de refeições dentro da dieta

## RNs (Regras de negócio - Regras de como pode ser feito, sempre relacionada ao requisito funcional)
- [X] O usuário não pode se cadastrar com email já existente
- [X] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## RNFs (Requisitos não funcionais - Requisitos a nível técnico)
- [X] A senha do usuário precisa estar criptografada
- [X] Os dados da aplicação ficarão persistidos em um banco PostgreSQL
- [X] O usuário é identificado por um JWT
