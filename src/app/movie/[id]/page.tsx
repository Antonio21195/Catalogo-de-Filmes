import { MovieDetails } from "@/components/MovieDetails";

type MoviePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  return <MovieDetails id={id} />;
}
