type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-8 px-5">
      <label htmlFor="movie-search" className="sr-only">
        Buscar filmes
      </label>
      <input
        id="movie-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar filmes por titulo"
        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
      />
    </div>
  );
}
