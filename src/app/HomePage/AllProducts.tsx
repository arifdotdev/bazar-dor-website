import Image from "next/image";

interface Product {
    id: number | string;
    nameBn: string;
    image?: string;
    today: number | string;
    change?: {
        pct?: number | string;
    };
}

interface AllProductsProps {
    data: Product[];
}

const AllProducts = ({ data }: AllProductsProps) => {
    const products = Array.isArray(data) ? data : [];

    return (
        <section className="min-h-screen py-6 ">
            <div className="mx-auto">
                <h2 className="text-xl font-bold text-[#202b23]">
                    সব পণ্য
                </h2>

                <p className="mt-2 text-sm text-[#7b847c]">
                    মোট {products.length}টি পণ্য দেখানো হচ্ছে
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => {
                        const change = Number(product.change?.pct ?? 0);
                        const isPositive = change > 0;
                        const isNegative = change < 0;

                        return (
                            <div
                                key={product.id}
                                className="rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-3.5 transition-shadow hover:shadow-sm"
                            >
                                {/* Product image and name */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f4ef]">
                                        {product.image &&
                                            product.image.startsWith("http") ? (
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

                                {/* Today's price and price change */}
                                <div className="mt-3 flex items-end justify-between gap-2">
                                    <div>
                                        <p className="text-xs text-[#68736a]">
                                            আজকের দাম
                                        </p>
                                        <p className="mt-0.5 text-base font-bold text-[#202b23]">
                                            {product.today} টাকা
                                        </p>
                                    </div>

                                    <span
                                        className={`mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${isPositive
                                                ? "bg-[#fceeee] text-[#dc4545]"
                                                : isNegative
                                                    ? "bg-[#eaf7ee] text-[#159447]"
                                                    : "bg-[#eef3ee] text-[#4b554c]"
                                            }`}
                                    >
                                        {isPositive ? "▲" : isNegative ? "▼" : "—"}
                                        {" "}
                                        {Math.abs(change).toLocaleString("bn-BD", {
                                            maximumFractionDigits: 2,
                                        })}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AllProducts;