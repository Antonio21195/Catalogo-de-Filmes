type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
};

const sizeClasses = {
  sm: "h-10 w-10 border-2",
  md: "h-16 w-16 border-4",
  lg: "h-32 w-32 border-4",
};

export function Spinner({ size = "lg", fullScreen = false }: SpinnerProps) {
  const spinner = (
    <div className="relative flex items-center justify-center">
      <div className={`absolute rounded-full border border-zinc-800 ${sizeClasses[size]}`} />
      <div
        className={`animate-spin rounded-full border-zinc-800 border-t-zinc-100 border-r-zinc-400 ${sizeClasses[size]}`}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
        {spinner}
      </div>
    );
  }

  return spinner;
}
