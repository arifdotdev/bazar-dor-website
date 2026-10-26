import { Bone, ProductGridSkeleton } from "@/components/Skeletons";

// category page skeleton: title card, sort card, product grid
const CategoryLoading = () => {
    return (
        <div role="status" aria-live="polite" aria-label="লোড হচ্ছে..." className="flex-1 bg-[#F0F5F0] px-4 sm:px-6">
            <div className="mx-auto max-w-6xl py-1">
                <div className="my-5 flex items-center gap-3 rounded-3xl bg-white p-4 sm:gap-4 sm:rounded-4xl sm:p-5">
                    <Bone className="size-12 shrink-0 rounded-xl sm:size-14" />
                    <div className="w-full space-y-2">
                        <Bone className="h-7 w-32 sm:h-8" />
                        <Bone className="h-4 w-56 max-w-full" />
                    </div>
                </div>

                <div className="my-5 flex justify-end rounded-3xl bg-white p-4 sm:rounded-4xl sm:p-5">
                    <Bone className="h-11 w-full sm:w-80" />
                </div>

                <div className="mb-10">
                    <ProductGridSkeleton />
                </div>
            </div>
        </div>
    );
};

export default CategoryLoading;
