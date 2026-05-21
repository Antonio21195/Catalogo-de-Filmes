"use client";

import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
};

type Movie = {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  genreIds: number[];
};

type TmdbPopularMoviesResponse = {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
};

type MoviesContextValue = {
  movies: Movie[];
  isPending: boolean;
  error: Error | null;
};

type GetMoviesProps = {
  children: ReactNode;
};

const MoviesContext = createContext<MoviesContextValue | null>(null);

async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch("/api/movies/popular");

  if (!response.ok) {
    throw new Error("Falha ao buscar os filmes pela API.");
  }

  const data: TmdbPopularMoviesResponse = await response.json();

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    genreIds: movie.genre_ids,
  }));
}

export function GetMovies({ children }: GetMoviesProps) {
  const { data = [], isPending, error } = useQuery<Movie[], Error>({
    queryKey: ["popular-movies"],
    queryFn: getPopularMovies,
  });

  return (
    <MoviesContext.Provider value={{ movies: data, isPending, error }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMovies must be used inside GetMovies.");
  }

  return context;
}
