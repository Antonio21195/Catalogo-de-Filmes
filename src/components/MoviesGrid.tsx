"use client";

import { useEffect, useMemo, useState } from "react";
import { MovieCard } from "@/components/MovieCard";
import { SearchBar } from "@/components/SearchBar";
import { Spinner } from "@/components/Spinner";
import { useMovies } from "@/providers/TMDB-provider";

export function MoviesGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const {
    movies,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useMovies();

  useEffect(() => {
    // Aplica um pequeno atraso para evitar refiltrar a cada tecla digitada.
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const filteredMovies = useMemo(() => {
    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return movies;
    }

    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(normalizedSearch),
    );
  }, [debouncedSearchTerm, movies]);

  const hasActiveSearch = debouncedSearchTerm.trim().length > 0;

  if (isPending) {
    return <Spinner fullScreen />;
  }

  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="animate-fade-in-up p-5 text-5xl font-bold text-heading">
        Filmes Populares
      </h1>
      <div className="animate-fade-in-up-delay">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="animate-fade-in-up-delay grid gap-6 lg:grid-cols-4">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.releaseDate}
            posterPath={movie.posterPath}
            voteAverage={movie.voteAverage}
          />
        ))}
      </div>
      {filteredMovies.length === 0 ? (
        <p className="px-5 pt-8 text-center text-zinc-400">
          Nenhum filme encontrado para essa busca.
        </p>
      ) : null}
       {/* Esconde a paginação enquanto o filtro local estiver ativo para não misturar busca e carregar mais. */}
       {hasNextPage && !hasActiveSearch ? (
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => {
            void fetchNextPage();
          }}
          disabled={isFetchingNextPage}
          className="flex min-h-12 min-w-40 items-center justify-center rounded-full bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFetchingNextPage ? <Spinner size="sm" /> : "Carregar mais"}
        </button>
      </div>
    ) : null}
    </div>
  );
}
