Catálogo de Filmes Next 

Esta aplicação visa implementar a API de filmes The Movie Database, para apresentar um catálogo de filmes mais populares.

Técnologias implementadas:
- NextJS como framework javascript base da aplicação.

- Tanstack Query para gerenciar a busca de dados da API e gerenciar a atualização dos estados dos compontentes no servidor.

- Tailwind CSS para Estilizar a aplicação.

Funcionalidades implementadas:

- Configuração Inicial do projeto
- Componente Provider do Tanstack Query
- Componente Provider da API TMDB (Mudou de um componente de teste para versão final implementado como Provider.)
- Esboço do Componente MovieCard (ainda sem estilização completa)
- Esboço da Pagina principal, organizando os filmes em uma grade de cards (ainda sem estilização completa)

Instruções de Inicialização:

1. Clonar o repositório
No terminal, execute:

git clone https://github.com/Antonio21195/Catalogo-de-Filmes.git
cd catalogo-filmes


2. Instalar as dependências
Este projeto usa Next.js, React, TanStack Query e Tailwind CSS.

Com npm:

npm install

3. Configurar variáveis de ambiente
Existe um arquivo de ambiente na raiz do projeto chamado .env.local com estas variáveis:

TMDB_API_TOKEN=<Insira seu Token aqui>
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500

Este arquivo não faz parte do repositório, crie um arquivo .env.local com esses valores na raiz do seu projeto.

Sem essas variaveis o sistema nao consegue se comunciar com a API de filmes.

4. Rodar em ambiente de desenvolvimento
Execute:

npm run dev
Depois, abra no navegador:

http://localhost:3000

5. Gerar build de produção
Para compilar a aplicação:

npm run build

6. Rodar em produção
Após o build, execute:

npm run start


TLDR (Resumo dos comandos):

git clone https://github.com/Antonio21195/Catalogo-de-Filmes.git
cd catalogo-filmes
criar um arquivo .env.local com os valores do passo 3.
npm install
npm run dev
A aplicação ficará disponível em http://localhost:3000.