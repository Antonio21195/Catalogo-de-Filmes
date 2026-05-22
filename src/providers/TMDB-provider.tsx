"use client";

import { createContext, ReactNode, useContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

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
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

type GetMoviesProps = {
  children: ReactNode;
};

const MoviesContext = createContext<MoviesContextValue | null>(null);

async function getPopularMovies(page: number): Promise<TmdbPopularMoviesResponse> {
  const response = await fetch(`/api/movies/popular?page=${page}`);

  if (!response.ok) {
    throw new Error("Falha ao buscar os filmes pela API.");
  }

  const data: TmdbPopularMoviesResponse = await response.json();

  return data;

}

export function GetMovies({ children }: GetMoviesProps) {
  const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["popular-movies"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getPopularMovies(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });

  const movies =
    data?.pages.flatMap((page) =>
      page.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
        genreIds: movie.genre_ids,
      })),
    ) ?? [];

  return (
    <MoviesContext.Provider value={{ movies, isPending, error, fetchNextPage, hasNextPage: Boolean(hasNextPage), isFetchingNextPage }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMovies deve ser usado dentro de GetMovies");
  }

  return context;
}
