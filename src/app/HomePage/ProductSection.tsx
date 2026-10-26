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

// size of the move, so ranking works whether a fall is sent as -6.2 or 6.2
const changeSize = (product: Product) => Math.abs(Number(product.change?.pct ?? 0));

const topMovers = (data: Product[], dir: "up" | "down") =>
    data
        .filter((product) => product.change?.dir === dir)
        .sort((a, b) => changeSize(b) - changeSize(a))
        .slice(0, 6);

// 6 cards: 1 col on mobile, 2 on tablet, 3 on desktop (two full rows)
const moverGridClass = "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";

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

    // Section A: biggest rises first · Section B: biggest drops first
    const upProducts = topMovers(data, "up");
    const downProducts = topMovers(data, "down");

    return (
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
            {/* Section A — products with increased prices */}
            <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-[#202b23]">
                    আজ দাম বেড়েছে <span className="text-base text-[#dc4545]" aria-hidden>▲</span>
                </h2>

                <div className={moverGridClass}>
                    {upProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {upProducts.length === 0 && (
                    <p className="mt-4 text-sm text-[#7b847c]">
                        আজ কোনো পণ্যের দাম বাড়েনি।
                    </p>
                )}
            </section>

            {/* Section B — products with decreased prices */}
            <section className="mt-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-[#202b23]">
                    আজ দাম কমেছে <span className="text-base text-[#159447]" aria-hidden>▼</span>
                </h2>

                <div className={moverGridClass}>
                    {downProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {downProducts.length === 0 && (
                    <p className="mt-4 text-sm text-[#7b847c]">
                        আজ কোনো পণ্যের দাম কমেনি।
                    </p>
                )}
            </section>

            {/* Section C — all products */}
            <section className="mt-8 scroll-mt-4" id='allProductId'>
                <AllProducts data={data} />
            </section>
        </div>
    );
};

export default ProductSection;
