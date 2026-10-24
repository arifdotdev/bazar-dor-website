import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="max-w-7xl mx-auto my-6 rounded-[22px] border border-[#dfe9e1] bg-[#f9fcf9] px-5 py-8">
            <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:gap-8">
                {/* Banner Content */}
                <div className="w-full md:w-[58%]">
                    <span className="inline-flex rounded-full bg-[#e2f3e8] px-3 py-1 text-xs font-medium text-[#078b45]">
                        শুক্রবার, ২৩ অক্টোবর, ২০২৬
                    </span>

                    <h1 className="mt-3 text-2xl leading-tight font-extrabold tracking-tight text-[#202a23] sm:text-3xl lg:text-[32px]">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-[#68716b] sm:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <Link
                        href="#allProductId"
                        className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#078b45] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_3px_0_#056c36] transition hover:bg-[#06783c] active:translate-y-0.5 active:shadow-none"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>

                {/* Banner Image */}
                <div className="flex w-full items-center justify-center md:w-[38%] md:justify-end">
                    <Image
                        src="/bazar-hero.png"
                        width={300}
                        height={220}
                        alt="বাজারের তাজা সবজি ও পণ্য"
                        priority
                        className="h-auto w-48 object-contain sm:w-56 md:w-full md:max-w-[280px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;