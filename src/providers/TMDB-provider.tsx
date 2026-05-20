"use client";

import { ReactNode } from "react";
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

type GetMoviesChildrenProps = {
  movies: Movie[];
  isPending: boolean;
  error: Error | null;
};

type GetMoviesProps = {
  children: (props: GetMoviesChildrenProps) => ReactNode;
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDRmOWJjNDE4M2IwMDhmMTZhNjkwMmQ3M2E5Yzk5NCIsIm5iZiI6MTc3OTIxODg2OC4yNzcsInN1YiI6IjZhMGNiOWI0YzcyNDI3YzIzMTA2OWI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jMdBZqPEbN4bEek5-2e2V-tL1p7Jb4Z79XM7kRH_krQ",
  },
};

async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies from TMDB.");
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

  return <>{children({ movies: data, isPending, error })}</>;
}
