type MovieCardProps = {
    title: string;
    overview: string;
    releaseDate: string;
    posterPath: String | null;
    voteAverage: number;
};

export function MovieCard({
    title,
  overview,
  releaseDate,
  posterPath,
  voteAverage,
}: MovieCardProps){
    return(
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-1 hover:border-zinc-700">
             <div className="aspect-2/3 w-full bg-zinc-800" />
      <h2>{title}</h2>
      {/* <p>{overview}</p> */}
      <p>Release date: {releaseDate}</p>
      <p>Rating: {voteAverage}</p>
      {posterPath && <p>Poster: {posterPath}</p>}
      
    </article>
    )
}