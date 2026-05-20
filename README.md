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
Existe um arquivo de ambiente em src/.env.local com estas variáveis:

NEXT_PUBLIC_TMDB_API_KEY=...
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
Se esse arquivo não vier no repositório, crie src/.env.local com esses valores.

Observação importante: no estado atual do código, a busca de filmes usa um token Bearer fixo dentro de src/providers/TMDB-provider.tsx, então o app pode funcionar mesmo sem ler essas variáveis. Ainda assim, manter o .env.local configurado é recomendado.

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
npm install
npm run dev
A aplicação ficará disponível em http://localhost:3000.