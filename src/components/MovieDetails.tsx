"use client";

import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import { TmdbPopularMoviesResponse } from "@/providers/TMDB-provider";

const imgBaseUrl =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/w500";

type MovieDetailsProps = {
  id: string;
};

const genreMap: Record<number, string> = {
  28: "Ação",
  12: "Aventura",
  16: "Animação",
  35: "Comédia",
  80: "Crime",
  99: "Documentário",
  18: "Drama",
  10751: "Família",
  14: "Fantasia",
  36: "História",
  27: "Terror",
  10402: "Música",
  9648: "Mistério",
  10749: "Romance",
  878: "Ficção científica",
  10770: "Cinema TV",
  53: "Thriller",
  10752: "Guerra",
  37: "Faroeste",
};

function renderStars(voteAverage: number) {
  const filledStars = Math.round(voteAverage / 2);

  return (
    <div className="flex items-center gap-1 text-2xl leading-none">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < filledStars ? "text-white" : "text-zinc-700"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function MovieDetails({ id }: MovieDetailsProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Lê o cache bruto da infinite query em vez de fazer uma segunda chamada para a API.
  const cachedData = queryClient.getQueryData<{
    pages: TmdbPopularMoviesResponse[];
    pageParams: number[];
  }>(["popular-movies"]);

  const movie = useMemo(() => {
    const movieId = Number(id);

    if (!cachedData) {
      return null;
    }

    const movies = cachedData.pages.flatMap((page) => page.results);

    return movies.find((item) => item.id === movieId) ?? null;
  }, [cachedData, id]);

  useEffect(() => {
    // Se a página for atualizada, o cache em memória se perde, então redirecionei para a home.
    if (!cachedData || !movie) {
      router.replace("/");
    }
  }, [cachedData, movie, router]);

  if (!cachedData || !movie) {
    return <Spinner fullScreen />;
  }

  const posterUrl = movie.poster_path ? `${imgBaseUrl}${movie.poster_path}` : null;
  const genres = movie.genre_ids
    .map((genreId) => genreMap[genreId])
    .filter(Boolean);
  const [year, month, day] = movie.release_date.split("-");
  const formattedReleaseDate = `${day}/${month}/${year}`;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[320px_1fr] md:items-start">
        <div className="animate-fade-in-up overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-2/3 items-center justify-center bg-zinc-800 text-zinc-400">
              Sem imagem
            </div>
          )}
        </div>

        <section className="animate-fade-in-up-delay flex flex-col gap-6">
          <div>
            <h1 className="mb-4 text-4xl font-bold">{movie.title}</h1>
            <p className="text-lg leading-8 text-zinc-300">{movie.overview}</p>
          </div>

          {genres.length > 0 ? (
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium uppercase tracking-wide text-zinc-400">
                Gêneros
              </span>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium uppercase tracking-wide text-zinc-400">
              Avaliação
            </span>
            <div className="group relative w-fit">
              {renderStars(movie.vote_average)}
              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                Nota TMDB: {movie.vote_average.toFixed(1)} / 10
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium uppercase tracking-wide text-zinc-400">
              Data de lançamento
            </span>
            <span className="text-lg leading-8 text-zinc-300">{formattedReleaseDate}</span>
          </div>
        </section>
      </div>
    </main>
  );
}
