function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
      <div className="h-56 bg-white/10"></div>

      <div className="space-y-4 p-5">
        <div className="h-6 w-2/3 rounded-full bg-white/10"></div>
        <div className="h-4 w-full rounded-full bg-white/10"></div>
        <div className="h-4 w-4/5 rounded-full bg-white/10"></div>

        <div className="flex items-center justify-between">
          <div className="h-8 w-24 rounded-full bg-white/10"></div>
          <div className="h-10 w-20 rounded-full bg-white/10"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;