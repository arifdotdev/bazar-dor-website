import Image from "next/image";
import Link from "next/link";

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

const toBn = (n: number) =>
    n.toLocaleString("bn-BD", {
        minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
        maximumFractionDigits: 2,
    });

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};
const ProductCard = ({ product }: { product: Product }) => {
    const change = Number(product.change?.pct ?? 0);
    const isPositive = change > 0;
    const isNegative = change < 0;

    return (
        <Link
            href={`/products/${product.id}`}
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
                        প্রতি {unitBn[product.unit ?? "kg"] ?? product.unit}
                    </p>
                </div>
            </div>

            <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                    <p className="text-xs text-[#68736a]">
                        আজকের দাম
                    </p>

                    <p className="mt-0.5 text-base font-bold text-[#202b23]">
                        {toBn(Number(product.today))} টাকা
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
                    {toBn(Math.abs(change))}%
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;