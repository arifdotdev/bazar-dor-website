import { Bone, ProductGridSkeleton } from "@/components/Skeletons";

// home page skeleton: banner + product sections
const Loading = () => {
  return (
    <div role="status" aria-live="polite" aria-label="লোড হচ্ছে..." className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
      {/* banner */}
      <div className="my-6 flex flex-col-reverse items-center gap-6 rounded-[22px] border border-[#dfe9e1] bg-[#f9fcf9] px-5 py-8 sm:px-8 md:flex-row md:justify-between lg:px-12 lg:py-10">
        <div className="flex w-full flex-col items-center space-y-4 md:w-[58%] md:items-start">
          <Bone className="h-6 w-40 rounded-full" />
          <Bone className="h-8 w-4/5" />
          <Bone className="h-4 w-full max-w-xl" />
          <Bone className="h-4 w-2/3" />
          <Bone className="mt-2 h-10 w-32" />
        </div>
        <Bone className="h-36 w-48 rounded-2xl sm:w-56 md:h-48 md:w-[38%] md:max-w-[280px]" />
      </div>

      {/* product sections */}
      {[0, 1].map((section) => (
        <div key={section} className="mt-8 first:mt-0">
          <Bone className="h-7 w-40" />
          <ProductGridSkeleton />
        </div>
      ))}
    </div>
  );
};

export default Loading;
