export type SortOption = "default" | "price-asc" | "price-desc";

// unknown or missing ?sort → keep the API order
export const parseSortOption = (value?: string): SortOption =>
    value === "price-asc" || value === "price-desc" ? value : "default";

const bnDigits = "০১২৩৪৫৬৭৮৯";

// prices may arrive as numbers or Bengali text ("১,৪৮.৫০ টাকা") — compare the real value,
// never the string ("৯৯" > "১৪৮" as text). Unparseable → NaN.
export const toPriceNumber = (value: number | string): number => {
    if (typeof value === "number") return value;
    const ascii = value
        .replace(/[০-৯]/g, (digit) => String(bnDigits.indexOf(digit)))
        .replace(/[,\s]/g, "");
    return Number.parseFloat(ascii);
};

// "default" keeps the API order; products without a valid price go last either way
export const sortByPrice = <T extends { today: number | string }>(products: T[], sort: SortOption): T[] => {
    if (sort === "default") return products;
    const direction = sort === "price-asc" ? 1 : -1;

    return [...products].sort((a, b) => {
        const priceA = toPriceNumber(a.today);
        const priceB = toPriceNumber(b.today);
        if (Number.isNaN(priceA)) return Number.isNaN(priceB) ? 0 : 1;
        if (Number.isNaN(priceB)) return -1;
        return (priceA - priceB) * direction;
    });
};
