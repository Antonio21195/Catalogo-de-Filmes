"use client";

import { MovieCard } from "@/components/MovieCard";
import { useMovies } from "@/providers/TMDB-provider";

export function MoviesGrid() {
  const { movies, isPending, error } = useMovies();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="p-5 text-5xl font-bold text-heading">Filmes Populares</h1>
      <div className="grid gap-6 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.releaseDate}
            posterPath={movie.posterPath}
            voteAverage={movie.voteAverage}
          />
        ))}
      </div>
    </div>
  );
}
