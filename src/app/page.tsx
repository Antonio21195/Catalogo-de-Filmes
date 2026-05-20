"use client";

import { GetMovies } from "@/providers/TMDB-provider";
import { MovieCard } from "@/components/MovieCard";

export default function Home() {
  return (
    <div>
      <GetMovies>
        {({ movies, isPending, error }) => {
          if (isPending) {
            return <p>Loading...</p>;
          }

          if (error) {
            return <p>An error has occurred: {error.message}</p>;
          }

          return (
            <div className= "mx-auto max-w-7x1 px-6 py-10">
              <h1>Popular Movies</h1>
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
        }}
      </GetMovies>
    </div>
  );
}
