import { Skeleton } from "@heroui/react";

// HeroUI skeleton tinted to the site's green-grey palette
export const Bone = ({ className = "" }: { className?: string }) => (
    <Skeleton className={`rounded-lg bg-[#e3ebe3] ${className}`} />
);

// same shape as ProductCard
export const ProductCardSkeleton = () => (
    <div className="rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-3.5">
        <div className="flex items-center gap-3">
            <Bone className="size-12 shrink-0 rounded-xl" />
            <div className="w-full space-y-2">
                <Bone className="h-4 w-2/3" />
                <Bone className="h-3 w-1/3" />
            </div>
        </div>
        <div className="mt-4 flex items-end justify-between gap-2">
            <div className="w-1/2 space-y-2">
                <Bone className="h-3 w-1/2" />
                <Bone className="h-5 w-3/4" />
            </div>
            <Bone className="h-6 w-14 rounded-full" />
        </div>
    </div>
);

export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
            <ProductCardSkeleton key={i} />
        ))}
    </div>
);

// category menu placeholder while categories load: hamburger on mobile, link row on md+
export const NavSkeleton = () => (
    <div className="flex items-center gap-3 overflow-hidden px-4 py-2 sm:px-6 md:py-4">
        <Bone className="size-10 shrink-0 rounded-md md:hidden" />
        {Array.from({ length: 9 }, (_, i) => (
            <Bone key={i} className="hidden h-9 w-16 shrink-0 rounded-md md:block" />
        ))}
    </div>
);
