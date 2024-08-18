# Sistema Bancário - Front-End

Este é o projeto front-end de um sistema bancário, desenvolvido em React, que se comunica com uma API back-end. A aplicação permite visualizar, incluir e excluir dados de clientes, contas e transações.

## Funcionalidades

- **Listar Clientes**: Exibe uma tabela com a lista de clientes cadastrados no sistema.
- **Incluir Cliente**: Permite adicionar novos clientes ao sistema através de um formulário.
- **Excluir Cliente**: Permite excluir um cliente existente.
  
- **Listar Contas**: Exibe uma tabela com a lista de contas bancárias cadastradas.
- **Incluir Conta**: Permite adicionar novas contas ao sistema.
- **Excluir Conta**: Permite excluir uma conta existente.
  
- **Listar Transações**: Exibe uma tabela com a lista de transações realizadas.
- **Incluir Transação**: Permite adicionar novas transações ao sistema.
- **Excluir Transação**: Permite excluir uma transação existente.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface do usuário.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **CSS**: Estilização da interface com uma abordagem moderna e clean.

## Pré-requisitos

Antes de iniciar, certifique-se de que o back-end da aplicação esteja rodando e que a API esteja disponível no endereço `http://localhost:8080`.

## Executando a Aplicação
Para iniciar o servidor de desenvolvimento e executar o projeto:

```bash
npm start
```

A aplicação estará disponível em http://localhost:3000.

## Estrutura do Projeto
 - **src/components/:**

 - - **Menu.js**: Componente de menu para navegação entre as seções (Clientes, Contas, Transações).
 - - **Clientes.js**: Componente para listar, incluir e excluir clientes.
 - - **Contas.js**: Componente para listar, incluir e excluir contas.
 - - **Transacoes.js**: Componente para listar, incluir e excluir transações.
 - - **App.js**: Componente principal que gerencia a navegação e renderização dos componentes.

## API Endpoints

A aplicação se comunica com os seguintes endpoints do back-end:

### Clientes:
- `GET /clientes/listar`: Lista todos os clientes.
- `POST /clientes/incluir`: Adiciona um novo cliente.
- `DELETE /clientes/{id}`: Exclui um cliente pelo ID.

### Contas:
- `GET /contas/listar`: Lista todas as contas.
- `POST /contas/incluir`: Adiciona uma nova conta.
- `DELETE /contas/{id}`: Exclui uma conta pelo ID.

### Transações:
- `GET /transacoes/listar`: Lista todas as transações.
- `POST /transacoes/incluir`: Adiciona uma nova transação.
- `DELETE /transacoes/{id}`: Exclui uma transação pelo ID.