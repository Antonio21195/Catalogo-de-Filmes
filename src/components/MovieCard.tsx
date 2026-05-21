const imgBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/w500"

type MovieCardProps = {
    title: string;
    overview: string;
    releaseDate: string;
    posterPath: string | null;
    voteAverage: number;
    
};

export function MovieCard({
    title,
    overview,
    releaseDate,
    posterPath,
    voteAverage,
}: MovieCardProps) {
    const posterUrl = posterPath ? imgBaseUrl + posterPath : null;
    const releaseYear = releaseDate.split("-")[0];

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-1 hover:border-zinc-400">
            <div className="aspect-2/3 w-full bg-zinc-800">
                {posterUrl ? (
                    <img
                        src={posterUrl}
                        alt={title + " poster"}
                        className="aspect-2/3 w-full object-cover"
                    />
                ) : null}
            </div>
            <div className="flex flex-1 flex-col items-center p-4 text-center">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="line-clamp-2 text-base font-semibold text-white">
                        {title}
                    </h2>
                </div>
                <div className="mt-auto text-sm text-white">
                    <h2 className="line-clamp-2 text-sm font-semibold text-white">
                        {releaseYear}
                    </h2>
                </div>
            </div>

        </article>
    )
}
