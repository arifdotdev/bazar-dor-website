import Link from "next/link";
import MarqueeText from "react-marquee-text";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ChangeIndicatorProps {
    dir?: string;
}

interface Headlines {
    id: number;
    categoryIcon: string
    nameBn: string
    today: number
    unit: string
    change?: {
        dir?: string;
        pct?: number | string;
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

const ChangeIndicator = ({ dir }: ChangeIndicatorProps) => {
    if (dir?.toLowerCase() === "down") {
        return <ArrowDown size={14} className="text-red-500" />;
    }

    if (dir?.toLowerCase() === "up") {
        return <ArrowUp size={14} className="text-green-500" />;
    }

    return null;
};

const Marquee = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products",
        {
            next: { revalidate: 3600 },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product data");
    }

    const data = await res.json();

    // Adjust this if the API returns products inside data.data.
    const headlines = Array.isArray(data) ? data : data.data ?? [];

    return (
        <div className="bg-[#f8faf8] border-y-2 border-gray-300">
            <MarqueeText
                className="py-1"
                direction="right"
                duration={50}
            >
                {headlines.map((h: Headlines) => (
                    <Link
                        className="hover:underline"
                        href={`/products/${h.id}`}
                        key={h.id}
                    >
                        <div className="text-[#1D271F] flex gap-1 items-center">
                            <span>{h.categoryIcon}</span>

                            <span>{h.nameBn}</span>

                            <div className="flex gap-1 items-center">
                                <span>{toBn(h.today)}</span>
                                <span>টাকা/{unitBn[h.unit] ?? h.unit}</span>
                            </div>

                            <div className="flex gap-1 items-center">
                                <ChangeIndicator dir={h.change?.dir} />

                                <span
                                    className={
                                        h.change?.dir?.toLowerCase() === "down"
                                            ? "text-red-500"
                                            : h.change?.dir?.toLowerCase() === "up"
                                                ? "text-green-500"
                                                : "text-gray-500"
                                    }
                                >
                                    {toBn(Math.abs(Number(h.change?.pct ?? 0)))}%
                                </span>
                            </div>

                            <span className="mx-5">|</span>
                        </div>
                    </Link>
                ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;