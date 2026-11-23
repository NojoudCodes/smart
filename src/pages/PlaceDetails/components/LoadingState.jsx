import Skeleton from "../../../components/ui/Skeleton";

export default function LoadingState() {
  return (
    <div className="mt-5 md:mt-7" aria-busy="true" aria-label="جاري التحميل">
      <Skeleton className="h-28" />
      <div className="mt-4 grid grid-cols-3 gap-3 md:mt-6 md:gap-5">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:mt-6 md:gap-5">
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
      </div>
    </div>
  );
}
