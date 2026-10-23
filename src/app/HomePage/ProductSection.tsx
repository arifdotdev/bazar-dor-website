import Image from "next/image";
import AllProducts from "./AllProducts";

interface Product {
    id: number | string;
    nameBn: string;
    image?: string;
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

    // Filter products whose prices increased
    const upProducts = data.filter(
        (product) => product.change?.dir === "up"
    );

    // Filter products whose prices decreased
    const downProducts = data.filter(
        (product) => product.change?.dir === "down"
    );

    return (
        <div className="mx-auto max-w-7xl">
            {/* Products with increased prices */}
            <section>
                <h2 className="text-xl font-bold text-[#202b23]">
                    আজ দাম বেড়েছে
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {upProducts.slice(0, 6).map((product) => {
                        const change = Number(product.change?.pct ?? 0);

                        return (
                            <div
                                key={product.id}
                                className="rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-3.5 transition-shadow hover:shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f4ef]">
                                        {product.image?.startsWith("http") ? (
                                            <Image
                                                src={product.image}
                                                alt={product.nameBn}
                                                width={36}
                                                height={36}
                                                className="h-9 w-9 object-contain"
                                            />
                                        ) : (
                                            <span className="text-2xl">
                                                {product.image || "🛒"}
                                            </span>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate text-sm font-bold text-[#202b23]">
                                            {product.nameBn}
                                        </h3>

                                        <p className="mt-0.5 text-xs text-[#7b847c]">
                                            প্রতি কেজি
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-end justify-between gap-2">
                                    <div>
                                        <p className="text-xs text-[#68736a]">
                                            আজকের দাম
                                        </p>

                                        <p className="mt-0.5 text-base font-bold text-[#202b23]">
                                            {product.today} টাকা
                                        </p>
                                    </div>

                                    <span className="mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fceeee] px-2 py-1 text-[11px] font-semibold text-[#dc4545]">
                                        ▲{" "}
                                        {Math.abs(change).toLocaleString("bn-BD", {
                                            maximumFractionDigits: 2,
                                        })}
                                        %
                                    </span>
                                </div>
                            </div>
                        );
                    })}
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
                    {downProducts.slice(0, 6).map((product) => {
                        const change = Number(product.change?.pct ?? 0);

                        return (
                            <div
                                key={product.id}
                                className="rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-3.5 transition-shadow hover:shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f4ef]">
                                        {product.image?.startsWith("http") ? (
                                            <Image
                                                src={product.image}
                                                alt={product.nameBn}
                                                width={36}
                                                height={36}
                                                className="h-9 w-9 object-contain"
                                            />
                                        ) : (
                                            <span className="text-2xl">
                                                {product.image || "🛒"}
                                            </span>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate text-sm font-bold text-[#202b23]">
                                            {product.nameBn}
                                        </h3>

                                        <p className="mt-0.5 text-xs text-[#7b847c]">
                                            প্রতি কেজি
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-end justify-between gap-2">
                                    <div>
                                        <p className="text-xs text-[#68736a]">
                                            আজকের দাম
                                        </p>

                                        <p className="mt-0.5 text-base font-bold text-[#202b23]">
                                            {product.today} টাকা
                                        </p>
                                    </div>

                                    <span className="mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#eaf7ee] px-2 py-1 text-[11px] font-semibold text-[#159447]">
                                        ▼{" "}
                                        {Math.abs(change).toLocaleString("bn-BD", {
                                            maximumFractionDigits: 2,
                                        })}
                                        %
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {downProducts.length === 0 && (
                    <p className="mt-4 text-sm text-[#7b847c]">
                        আজ কোনো পণ্যের দাম কমেনি।
                    </p>
                )}
            </section>

            {/* All products */}
            <section className="mt-8">
                <AllProducts data={data} />
            </section>
        </div>
    );
};

export default ProductSection;