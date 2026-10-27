import Link from 'next/link';
import { notFound } from 'next/navigation';

type Market = { market: string; division: string; min: number; max: number };

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

const ProductDetailsPage = async ({ params }: { params: Promise<{ productsId: string }> }) => {
    const { productsId } = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${encodeURIComponent(productsId)}`)

    if (!res.ok) {
        notFound()
    }

    const productData = await res.json()

    const unit = unitBn[productData.unit] ?? productData.unit

    const rateAdded = () => {
        const difference = productData.today - productData.yesterday;

        if (difference > 0) {
            return `বেড়েছে · ${toBn(Math.abs(difference))}`;
        } else if (difference < 0) {
            return `কমেছে · ${toBn(Math.abs(difference))}`;
        } else {
            return "অপরিবর্তিত · ০";
        }
    };

    const change = Number(productData.change?.pct ?? 0);
    const isPositive = change > 0;
    const isNegative = change < 0;

    const markets = ((productData.markets ?? []) as Market[])
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    const lowestPrice = markets.length ? Math.min(...markets.map((m) => m.min)) : 0;
    const highestPrice = markets.length ? Math.max(...markets.map((m) => m.max)) : 0;
    const averagePrice = markets.length
        ? Math.round(markets.reduce((sum, m) => sum + m.avg, 0) / markets.length)
        : 0;


    return (
        <div className='flex-1 bg-[#F0F5F0] px-4 py-6 sm:px-6 sm:py-10'>

            <div className='max-w-6xl mx-auto space-y-5'>
                <nav aria-label='breadcrumb' className='flex min-w-0 items-center gap-2 text-sm text-[#68736a] sm:text-base'>
                    <Link href='/' className='shrink-0 hover:text-[#159447] hover:underline'>হোম</Link>
                    <span>/</span>
                    <Link href={`/category/${productData.category}`} className='shrink-0 hover:text-[#159447] hover:underline'>{productData.categoryNameBn}</Link>
                    <span>/</span>
                    <span className='truncate font-semibold text-[#202b23]'>{productData.nameBn}</span>
                </nav>
                <div className='flex flex-col gap-5 rounded-3xl bg-white p-5 sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10'>
                    <div className='flex min-w-0 items-center gap-3 sm:gap-4'>
                        <div className='shrink-0 bg-[#F0F5F0] p-3 rounded-2xl text-5xl sm:p-5 sm:text-7xl'>{productData.image}</div>
                        <div className='min-w-0 space-y-1 text-sm sm:space-y-2 sm:text-base'>
                            <h2 className='text-2xl font-extrabold break-words sm:text-3xl lg:text-4xl'>{productData.nameBn}</h2>
                            <p>প্রতি {unit} · <span>{productData.categoryNameBn}</span></p>
                            <p>গতকালের তুলনায় আজ দাম <span className='font-bold'>{rateAdded()}</span> টাকা</p>
                        </div>
                    </div>
                    <div className='shrink-0 text-center bg-[#F0F5F0] p-5 rounded-2xl md:min-w-44'>
                        <p>আজকের দাম</p>
                        <p className='font-bold text-2xl'>{toBn(productData.today)}</p>
                        <p>টাকা / {unit}</p>
                        <p>
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
                        </p>
                    </div>
                </div>

                <div className='rounded-3xl bg-white p-5 sm:p-6 md:p-8 space-y-8'>

                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold text-[#1f2a20]'>দামের সারসংক্ষেপ</h3>
                        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                            <div className='rounded-2xl border border-[#e3ebe3] p-4 space-y-1 lg:p-5'>
                                <p className='text-sm text-[#4b554c]'>সর্বনিম্ন দাম</p>
                                <p className='text-[#159447]'>
                                    <span className='text-2xl font-extrabold lg:text-3xl'>{toBn(lowestPrice)}</span> টাকা
                                </p>
                                <p className='text-sm text-[#4b554c]'>সবচেয়ে কম দামের বাজার</p>
                            </div>
                            <div className='rounded-2xl border border-[#e3ebe3] p-4 space-y-1 lg:p-5'>
                                <p className='text-sm text-[#4b554c]'>সর্বাধিক দাম</p>
                                <p className='text-[#dc4545]'>
                                    <span className='text-2xl font-extrabold lg:text-3xl'>{toBn(highestPrice)}</span> টাকা
                                </p>
                                <p className='text-sm text-[#4b554c]'>সবচেয়ে বেশি দামের বাজার</p>
                            </div>
                            <div className='rounded-2xl border border-[#e3ebe3] p-4 space-y-1 lg:p-5'>
                                <p className='text-sm text-[#4b554c]'>গড় দাম</p>
                                <p className='text-[#159447]'>
                                    <span className='text-2xl font-extrabold lg:text-3xl'>{toBn(averagePrice)}</span> টাকা
                                </p>
                                <p className='text-sm text-[#4b554c]'>প্রতি {unit}-এর হিসাবে</p>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold text-[#1f2a20]'>বাজারভিত্তিক আজকের দাম</h3>

                        <ul className='overflow-hidden rounded-2xl border border-[#e3ebe3] md:hidden'>
                            {markets.map((m, index) => (
                                <li
                                    key={m.market}
                                    className={`flex items-center justify-between gap-3 border-t border-[#e3ebe3] px-4 py-3 text-[#1f2a20] first:border-t-0 ${index % 2 === 1 ? "bg-[#F0F5F0]" : "bg-white"}`}
                                >
                                    <div className='min-w-0'>
                                        <p className='truncate text-sm font-medium'>{m.market}</p>
                                        <p className='mt-0.5 text-xs text-[#7a857b]'>
                                            {m.division} · {toBn(m.min)}–{toBn(m.max)} টাকা
                                        </p>
                                    </div>
                                    <div className='shrink-0 text-right'>
                                        <p className='text-xs text-[#7a857b]'>গড়</p>
                                        <p className='text-sm font-bold'>{toBn(m.avg)} টাকা</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className='hidden overflow-x-auto rounded-2xl border border-[#e3ebe3] md:block'>
                            <table className='w-full min-w-[560px] text-sm'>
                                <thead>
                                    <tr className='text-[#7a857b]'>
                                        <th className='px-3 py-3 sm:px-4 text-left font-medium'>বাজার</th>
                                        <th className='px-3 py-3 sm:px-4 text-left font-medium'>বিভাগ</th>
                                        <th className='px-3 py-3 sm:px-4 text-right font-medium'>সর্বনিম্ন</th>
                                        <th className='px-3 py-3 sm:px-4 text-right font-medium'>সর্বাধিক</th>
                                        <th className='px-3 py-3 sm:px-4 text-right font-medium'>গড়</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {markets.map((m, index) => (
                                        <tr
                                            key={m.market}
                                            className={`border-t border-[#e3ebe3] text-[#1f2a20] ${index % 2 === 1 ? "bg-[#F0F5F0]" : "bg-white"}`}
                                        >
                                            <td className='px-3 py-3 sm:px-4'>{m.market}</td>
                                            <td className='px-3 py-3 sm:px-4'>{m.division}</td>
                                            <td className='px-3 py-3 sm:px-4 text-right'>{toBn(m.min)} টাকা</td>
                                            <td className='px-3 py-3 sm:px-4 text-right'>{toBn(m.max)} টাকা</td>
                                            <td className='px-3 py-3 sm:px-4 text-right font-bold'>{toBn(m.avg)} টাকা</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>


            </div>


        </div>
    );
};

export default ProductDetailsPage;