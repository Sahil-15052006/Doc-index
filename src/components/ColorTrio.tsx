export function ColorTrio({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-1 ${className}`} aria-hidden="true">
      <span className="size-1.5 bg-accent" />
      <span className="size-1.5 bg-cobalt" />
      <span className="size-1.5 bg-acid" />
    </span>
  );
}
