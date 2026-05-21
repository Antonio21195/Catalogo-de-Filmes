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
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <h2 className="line-clamp-2 text-lg font-semibold text-white">
                        {title}
                    </h2>
                    <span className="shrink-0 rounded-full bg-yellow-400/15 px-2 py-1 text-xs font-medium text-yellow-300">
                        {voteAverage}
                    </span>
                </div>
                <div className="mt-auto text-sm text-white">
                    <h2 className="line-clamp-2 text-lg font-semibold text-white">
                        Data de Lançamento: {releaseDate}
                    </h2>
                </div>
            </div>

        </article>
    )
}
