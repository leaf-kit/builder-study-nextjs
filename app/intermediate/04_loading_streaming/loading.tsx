export default function Loading() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-7 w-1/3 rounded bg-[rgba(127,127,127,0.2)]" />
      <div className="h-4 w-2/3 rounded bg-[rgba(127,127,127,0.2)]" />
      <div className="h-32 w-full rounded bg-[rgba(127,127,127,0.2)]" />
    </div>
  );
}
