'use client'
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { SortOption } from "@/lib/sortProducts";

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "default", label: "ডিফল্ট" },
    { value: "price-asc", label: "দাম: কম থেকে বেশি" },
    { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

const SortSelect = ({ value }: { value: SortOption }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (sort: string) => {
        // default order → clean URL without ?sort
        const href = sort === "default" ? pathname : `${pathname}?sort=${sort}`;
        router.replace(href, { scroll: false });
    };

    return (
        <label className="flex w-full items-center gap-3 sm:w-auto">
            <span className="shrink-0 text-sm font-semibold text-[#202b23] sm:text-base">সাজান:</span>

            <div className="relative w-full sm:w-64">
                <select
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-[#e3ebe3] bg-[#f8faf8] pr-10 pl-4 text-sm text-[#202b23] outline-none transition-colors hover:border-[#c9d9cb] focus:border-[#159447] focus:bg-white focus:ring-2 focus:ring-[#159447]/15 sm:text-base"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#68736a]"
                />
            </div>
        </label>
    );
};

export default SortSelect;
