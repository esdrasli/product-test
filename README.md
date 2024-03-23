# Documentação para Execução do Projeto
* Este documento fornece instruções detalhadas sobre como configurar e executar o projeto de backend, frontend e testes.

## Backend
### Requisitos
* Node.js
* npm (ou Yarn)
* Banco de dados SQLite

### Configuração

* Clone o repositório do projeto do GitHub:
  
``
git clone https://github.com/esdrasli/product-test.git
``

* Navegue até o diretório do projeto backend:

``
cd api-product
``

* Instale as dependências do projeto:

``npm install
``

ou

``
yarn install
``

Certifique-se de que o banco de dados SQLite esteja configurado corretamente no arquivo src/products/products.service.ts.

## Execução
* Para executar o servidor backend, execute o seguinte comando:

``
npm run start:dev
``

`` 
yarn start:dev
``

O servidor backend será iniciado na porta padrão 3000.

## Frontend

### Requisitos

* Node.js
* npm (ou Yarn)

### Configuração

* Navegue até o diretório do projeto frontend:
* 

``
cd product-frontend
``

* Instale as dependências do projeto:

``
npm install
``

ou

`` 
yarn install
``

### Execução

* Para iniciar o servidor de desenvolvimento do frontend, execute o seguinte comando:

``
npm start
``

ou

``
yarn start
``

O servidor frontend será iniciado e abrirá automaticamente no navegador padrão.

## Testes

### Requisitos

* Node.js
* npm (ou Yarn)
* Execução

* Para executar os testes do projeto, execute o seguinte comando:

``
npm test
``

ou

``
yarn test
``


Os testes serão executados e os resultados serão exibidos no console.
