# Catálogo de Filmes

Aplicação web construída com Next.js que consome a API da TMDB para exibir um catálogo de filmes populares com paginação incremental, busca local e página de detalhes baseada em cache do TanStack Query.


## Funcionalidades

- Listagem de filmes populares da TMDB
- Paginação incremental com botão `Carregar mais`
- Deduplicação de filmes carregados
- Busca local com debounce de 300ms sobre os filmes já carregados
- Cards clicáveis para navegação até a página de detalhes
- Página de detalhes com:
  - poster
  - sinopse
  - gêneros
  - avaliação em estrelas
  - data de lançamento
- Reaproveitamento do cache do TanStack Query na página de detalhes
- Redirecionamento para a home quando a página de detalhes é acessada sem cache válido
- Spinner reutilizável para estados de carregamento
- Fade-in simples na home e na página de detalhes

## Stack

- Next.js 16
- React 19
- TypeScript
- TanStack Query
- Tailwind CSS
- App Router

## Arquitetura de Dados

O fluxo principal da aplicação funciona assim:

1. A página principal renderiza `GetMovies`
2. `GetMovies` usa `useInfiniteQuery` para buscar filmes populares de forma paginada
3. O cliente consome a rota interna `/api/movies/popular`
4. A rota do servidor consulta a TMDB usando o token protegido em variável de ambiente
5. Os filmes são normalizados no provider antes de serem exibidos na interface
6. A página de detalhes reutiliza o cache bruto de `popular-movies` em vez de fazer uma nova chamada de API

## Estrutura do Projeto

```txt
src/
  app/
    api/
      movies/
        popular/
          route.ts
    movie/
      [id]/
        page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    MovieCard.tsx
    MovieDetails.tsx
    MoviesGrid.tsx
    SearchBar.tsx
    Spinner.tsx
  providers/
    query-provider.tsx
    TMDB-provider.tsx
```

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- Node.js
- npm

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Antonio21195/Catalogo-de-Filmes.git
cd catalogo-filmes
```

Instale as dependências:

```bash
npm install
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com o conteúdo abaixo:

```env
TMDB_API_TOKEN=<INSIRA_SEU_TOKEN_AQUI>
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
```

Descrição das variáveis:

- `TMDB_API_TOKEN`
  Token privado usado no servidor para autenticar chamadas à TMDB

- `TMDB_BASE_URL`
  URL base da API da TMDB usada pelas rotas server-side

- `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`
  URL pública usada para montar os posters exibidos no cliente

Importante:
- após alterar o `.env.local`, reinicie o servidor de desenvolvimento
- sem essas variáveis, a aplicação não consegue buscar os dados da TMDB

## Rodando em Desenvolvimento

Execute:

```bash
npm run dev
```

Depois, abra no navegador:

```txt
http://localhost:3000
```

## Build de Produção

Gerar build:

```bash
npm run build
```

Rodar em produção:

```bash
npm run start
```

## Scripts Disponíveis

- `npm run dev`
  Inicia o servidor de desenvolvimento

- `npm run build`
  Gera a build de produção

- `npm run start`
  Inicia a aplicação em modo produção

- `npm run lint`
  Executa o lint do projeto

## Decisões Técnicas

- O token da TMDB não é exposto no cliente
  As chamadas para a API externa passam por uma rota interna do Next.js

- A listagem principal usa `useInfiniteQuery`
  Isso permite paginação incremental com cache gerenciado pelo TanStack Query

- A página de detalhes usa o cache da query `popular-movies`
  Isso evita uma nova requisição e reaproveita os dados já carregados

- A busca é local
  Ela filtra apenas os filmes já buscados até o momento e não faz chamadas remotas


