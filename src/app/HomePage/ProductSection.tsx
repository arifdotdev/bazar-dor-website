import AllProducts from "./AllProducts";
import ProductCard from "@/components/ProductCard";

interface Product {
    id: number | string;
    nameBn: string;
    image?: string;
    unit?: string;
    today: number | string;
    change?: {
        pct?: number | string;
        dir?: string;
    };
}



const ProductSection = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products",
        {
            next: { revalidate: 3600 },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data: Product[] = await res.json();

    // Products whose prices increased, biggest rise first
    const upProducts = data
        .filter((product) => product.change?.dir === "up")
        .sort((a, b) => Number(b.change?.pct ?? 0) - Number(a.change?.pct ?? 0));

    // Products whose prices decreased, biggest drop first
    const downProducts = data
        .filter((product) => product.change?.dir === "down")
        .sort((a, b) => Number(a.change?.pct ?? 0) - Number(b.change?.pct ?? 0));

    return (
        <div className="mx-auto max-w-7xl">
            {/* Products with increased prices */}
            <section>
                <h2 className="text-xl font-bold text-[#202b23]">
                    আজ দাম বেড়েছে
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {upProducts.slice(0, 6).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {upProducts.length === 0 && (
                    <p className="mt-4 text-sm text-[#7b847c]">
                        আজ কোনো পণ্যের দাম বাড়েনি।
                    </p>
                )}
            </section>

            {/* Products with decreased prices */}
            <section className="mt-8">
                <h2 className="text-xl font-bold text-[#202b23]">
                    আজ দাম কমেছে
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {downProducts.slice(0, 6).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {downProducts.length === 0 && (
                    <p className="mt-4 text-sm text-[#7b847c]">
                        আজ কোনো পণ্যের দাম কমেনি।
                    </p>
                )}
            </section>

            {/* All products */}
            <section className="mt-8" id='allProductId'>
                <AllProducts data={data} />
            </section>
        </div>
    );
};

export default ProductSection;