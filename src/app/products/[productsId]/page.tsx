import { notFound } from 'next/navigation';

type Market = { market: string; division: string; min: number; max: number };

const toBn = (n: number) =>
    n.toLocaleString("bn-BD", {
        minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
        maximumFractionDigits: 2,
    });

const ProductDetailsPage = async ({ params }: { params: { productsId: string } }) => {
    const { productsId } = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productsId}`)
    const productData = await res.json()

    console.log(productData);
    if (!productData) {
        notFound()
    }

    const rateIncreaseDecrease = productData.yesterday - productData.today


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

    // market price summary
    const markets = ((productData.markets ?? []) as Market[])
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    const lowestPrice = markets.length ? Math.min(...markets.map((m) => m.min)) : 0;
    const highestPrice = markets.length ? Math.max(...markets.map((m) => m.max)) : 0;
    const averagePrice = markets.length
        ? Math.round(markets.reduce((sum, m) => sum + m.avg, 0) / markets.length)
        : 0;


    return (
        <div className='bg-[#F0F5F0] py-10'>

            <div className='max-w-7xl mx-auto space-y-5'>
                {/* breadcrumbs */}
                <div>Home/cha/batham size</div>
                {/* titles */}
                <div className='flex justify-between items-center p-10 rounded-3xl bg-white'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-[#F0F5F0] p-5 rounded-2xl text-7xl'>{productData.image}</div>
                        <div className='space-y-2'>
                            <h2 className='text-4xl font-extrabold'>{productData.nameBn}</h2>
                            <p>প্রতি কেজি · <span>{productData.categoryNameBn}</span></p>
                            <p>গতকালের তুলনায় আজ দাম <span className='font-bold'>{rateAdded()}</span> টাকা</p>
                        </div>
                    </div>
                    <div className='text-center bg-[#F0F5F0] p-5 rounded-2xl'>
                        <p>আজকের দাম</p>
                        <p className='font-bold text-2xl'>{toBn(productData.today)}</p>
                        <p>টাকা / কেজি</p>
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

                {/* description */}
                <div className='rounded-3xl bg-white p-6 md:p-8 space-y-8'>

                    {/* price summary */}
                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold text-[#1f2a20]'>দামের সারসংক্ষেপ</h3>
                        <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                            <div className='rounded-2xl border border-[#e3ebe3] p-5 space-y-1'>
                                <p className='text-sm text-[#4b554c]'>সর্বনিম্ন দাম</p>
                                <p className='text-[#159447]'>
                                    <span className='text-3xl font-extrabold'>{toBn(lowestPrice)}</span> টাকা
                                </p>
                                <p className='text-sm text-[#4b554c]'>সবচেয়ে কম দামের বাজার</p>
                            </div>
                            <div className='rounded-2xl border border-[#e3ebe3] p-5 space-y-1'>
                                <p className='text-sm text-[#4b554c]'>সর্বাধিক দাম</p>
                                <p className='text-[#dc4545]'>
                                    <span className='text-3xl font-extrabold'>{toBn(highestPrice)}</span> টাকা
                                </p>
                                <p className='text-sm text-[#4b554c]'>সবচেয়ে বেশি দামের বাজার</p>
                            </div>
                            <div className='rounded-2xl border border-[#e3ebe3] p-5 space-y-1'>
                                <p className='text-sm text-[#4b554c]'>গড় দাম</p>
                                <p className='text-[#159447]'>
                                    <span className='text-3xl font-extrabold'>{toBn(averagePrice)}</span> টাকা
                                </p>
                                <p className='text-sm text-[#4b554c]'>প্রতি কেজি-এর হিসাবে</p>
                            </div>
                        </div>
                    </div>

                    {/* market wise price table */}
                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold text-[#1f2a20]'>বাজারভিত্তিক আজকের দাম</h3>
                        <div className='overflow-x-auto rounded-2xl border border-[#e3ebe3]'>
                            <table className='w-full min-w-[640px] text-sm'>
                                <thead>
                                    <tr className='text-[#7a857b]'>
                                        <th className='px-4 py-3 text-left font-medium'>বাজার</th>
                                        <th className='px-4 py-3 text-left font-medium'>বিভাগ</th>
                                        <th className='px-4 py-3 text-right font-medium'>সর্বনিম্ন</th>
                                        <th className='px-4 py-3 text-right font-medium'>সর্বাধিক</th>
                                        <th className='px-4 py-3 text-right font-medium'>গড়</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {markets.map((m, index) => (
                                        <tr
                                            key={m.market}
                                            className={`border-t border-[#e3ebe3] text-[#1f2a20] ${index % 2 === 1 ? "bg-[#F0F5F0]" : "bg-white"}`}
                                        >
                                            <td className='px-4 py-3'>{m.market}</td>
                                            <td className='px-4 py-3'>{m.division}</td>
                                            <td className='px-4 py-3 text-right'>{toBn(m.min)} টাকা</td>
                                            <td className='px-4 py-3 text-right'>{toBn(m.max)} টাকা</td>
                                            <td className='px-4 py-3 text-right font-bold'>{toBn(m.avg)} টাকা</td>
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