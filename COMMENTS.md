# Challenge Fullstack - +A Educação - Módulo Acadêmico

## Introdução

Sistema desenvolvido em Vue.js e Node.js, com o objetivo de facilitar o cadastro e gerenciamento de matrículas em turmas online.

## Decisão da Arquitetura Utilizada

Para o desenvolvimento deste projeto, optei por uma arquitetura MVC (Model-View-Controller), para facilitar a legibilidade e o entendimento da estrutura do projeto. Além disso, essa melhor organização acaba facilitando a manutenção e o desenvolvimento de novas funcionalidades (escalabilidade) no projeto.
Os arquivos ficaram distribuídos da seguinte forma:
.
|-- frontend/
| `-- src/
|       |-- services/
|       |   |-- Serviços para conexão com o backend
|       |   `-- Regras de validação de campos
| `-- views/
|           `-- Telas do sistema
`-- backend/
    |-- controllers/
    |   `-- Métodos que conectam os endpoints à camada model
|-- middlewares/
| `-- Serviços relacionados à autenticação e qualquer intermediação de métodos
    |-- models/
    |   |-- Camada de acesso e configuração de conexão à base de dados
    |   `-- migrations/
| `-- Migrations para criação de tabelas na base de dados
    `-- routes/
`-- Rotas dos endpoints, que chamam os controladores
    `-- tests/
`-- Testes unitários

## Lista de Tecnologias e Bibliotecas

### Front-end (Vue.js com Vuetify)

- axios: Gerenciar as requisições HTTP
- jwt-decode: Decodificar tokens de autenticação
- maska: Aplicar máscara nos campos (CPF)
- material-design-icons-iconfont: Biblioteca externa de ícones
- vue-router: Gerenciar as trocas de rota (página)

### Lado do Servidor (Node.js)

- Express: Servir os endpoints para acesso via HTTP
- bcrypt: Codificar/Decodificar as senhas
- body-parser: Facilitar o acesso ao corpo das requisições
- cors: Permitir o acesso cross-origin aos endpoints
- jsonwebtoken (JWT): Gerenciar as autenticações do sistema, gerando tokens com chaves e decondificando-os
- Knex: ORM, construtor de consultas SQL e Migrations.
- Mocha: Framework d execução testes para o Node.js
- Chai: Biblioteca para escrita de testes em requisições HTTP e método assíncronos

### Banco de dados (Postgresql)

- PGAdmin: Sistema de gerenciamento de banco de dados

## Sistema

### Funcionalidades

- Cadastro de usuário com validação dos campos do formulário (Nome, e-mail e senha)
- Login com geração e autenticação de token usando JWT, para que apenas usuários autenticados possam acessar as funcionalidades do sistema
- Listagem de alunos cadastrados, com todas as informações presentes na tabela de dados, com a possibilidade de ordenação e paginação
- Cadastro de novos alunos, com validações de campos
- Edição de alunos existentes
- Remoção de alunos, com confirmação
- Opção para fazer logoff do sistema
- Verificações de segurança para que não seja possível utilizar as funcionalidades a não ser que o usuário esteja autenticado

### Flowchart

### O que eu melhoraria se tivesse mais tempo:

- Aumentaria a quantidade e cobertura dos testes, incluindo também o frontend

## Configuração de ambiente/Execução do projeto

### Front-end (Vue.js)

- Entre no diretório do frontend

```bash
  cd frontend
```

- Instale as dependências

```bash
  npm i
```

- Execute o sistema

```bash
  npm run serve
```

- Acesse o endereço do frontend no navegador

```bash
  localhost:8080
```

### Back-end (Node.js)

- Entre no diretório do backend

```bash
  cd backend
```

- Instale as dependências

```bash
  npm i
```

- Crie o banco de dados no postrgresql baseado nos dados do arquivo **model/knexfile.js**
  ** Em alguns casos, o banco de dados pode ser inicializado com a senha root como padrão, que vai causar erros nas requisições.
  Caso isso aconteça, ajuste a senha no arquivo knex (knexfile.js);**

```bash
      host: "localhost"
      user: "postgres"
      password: "postgres"
      database: "grupoa_crud"
```

- Execute as migrations usando o knex

```bash
  cd model
  npx knex migrate:latest
```

- Execute o servidor (Endereço: http://localhost:3000/)

```bash
  npm run serve
```

### Testes (Node.js)

- Entre no diretório do backend

```bash
  cd backend
```

- Execute os testes

```bash
  npm run tests
```

- Retorno esperado:

User Authentication
✔ deve retornar 401 para login inválido (79ms)
✔ deve retornar código 409 para cadastro com email existente (70ms)
✔ deve retornar código 201 para cadastro com dados válidos (64ms)
✔ deve retornar 200 para login válido (63ms)
