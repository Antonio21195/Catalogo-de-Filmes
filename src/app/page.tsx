import { MoviesGrid } from "@/components/MoviesGrid";
import { GetMovies } from "@/providers/TMDB-provider";

export default function Home() {
  return (
    <div>
      <GetMovies>
        <MoviesGrid />
      </GetMovies>
    </div>
  );
}
