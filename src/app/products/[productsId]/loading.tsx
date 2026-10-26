import { Bone } from "@/components/Skeletons";

// product details skeleton: hero card, price summary, market table
const ProductLoading = () => {
    return (
        <div role="status" aria-live="polite" aria-label="লোড হচ্ছে..." className="flex-1 bg-[#F0F5F0] px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-6xl space-y-5">
                <Bone className="h-4 w-48" />

                {/* hero */}
                <div className="flex flex-col gap-5 rounded-3xl bg-white p-5 sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10">
                    <div className="flex w-full items-center gap-3 sm:gap-4">
                        <Bone className="size-20 shrink-0 rounded-2xl sm:size-28" />
                        <div className="w-full space-y-3">
                            <Bone className="h-8 w-1/2 sm:h-10" />
                            <Bone className="h-4 w-1/3" />
                            <Bone className="h-4 w-2/3" />
                        </div>
                    </div>
                    <Bone className="h-32 w-full shrink-0 rounded-2xl md:w-44" />
                </div>

                {/* summary + table */}
                <div className="space-y-8 rounded-3xl bg-white p-5 sm:p-6 md:p-8">
                    <div className="space-y-4">
                        <Bone className="h-6 w-40" />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="space-y-2 rounded-2xl border border-[#e3ebe3] p-4 lg:p-5">
                                    <Bone className="h-4 w-1/3" />
                                    <Bone className="h-8 w-1/2" />
                                    <Bone className="h-4 w-2/3" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Bone className="h-6 w-52" />
                        <div className="space-y-3 rounded-2xl border border-[#e3ebe3] p-4">
                            {Array.from({ length: 6 }, (_, i) => (
                                <Bone key={i} className="h-6 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductLoading;
