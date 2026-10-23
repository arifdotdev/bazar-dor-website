import Image from 'next/image';
import React from 'react';

const CategoryPages = async ({ params }: { pamras: { categoryId: string } }) => {
    const { categoryId } = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`)

    const categoryData = await res.json()
    console.log(categoryData);

    // const categoryNames = categoryData.map((item) => item.categoryNameBn);
    const categoryNameBn = categoryData[0]?.categoryNameBn;
    const categoryIcon = categoryData[0]?.categoryIcon;


    return (
        <div className='bg-[#F0F5F0]'>
            <div className='max-w-7xl mx-auto '>
                <div className='my-5 border-0 space-y-10 rounded-4xl'>
                    <div className='bg-[#fff] p-5 border-0 rounded-4xl flex items-center gap-3'>
                        <div className='text-4xl'>{categoryIcon}</div>
                        <div>
                            <h2 className='font-bold text-3xl'>{categoryNameBn}</h2>
                            <p>{categoryData.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                        </div>
                    </div>
                </div>
                {/* filter */}
                <div className='my-5 border-0 space-y-10 rounded-4xl'>
                    <div className='bg-[#fff] p-5 border-0 rounded-4xl text-right'>
                        <p>sajan</p>
                        <input type="text" placeholder='sajan' />
                    </div>
                </div>

                <div className='mb-10'>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {categoryData.map((product) => {
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
            </div>
        </div>
    );
};

export default CategoryPages;