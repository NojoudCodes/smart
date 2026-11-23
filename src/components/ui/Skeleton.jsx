export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-card md:rounded-3xl ${className}`}
    />
  );
}
