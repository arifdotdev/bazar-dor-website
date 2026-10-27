import Image from "next/image";
import Link from "next/link";
import TodayDate from "./TodayDate";

const Banner = () => {
    return (
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6">
            <section className="my-6 rounded-[22px] border border-[#dfe9e1] bg-[#f9fcf9] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
                <div className="flex flex-col-reverse items-center justify-between gap-6 text-center md:flex-row md:gap-8 md:text-left">
                    <div className="w-full md:w-[58%]">
                        <TodayDate className="inline-block rounded-full bg-[#e2f3e8] px-3 py-1 text-xs font-medium text-[#078b45]" />

                        <h1 className="mt-3 text-2xl leading-tight font-extrabold tracking-tight text-[#202a23] sm:text-3xl lg:text-[32px]">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#68716b] sm:text-base md:mx-0">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                            দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <Link
                            href="#allProductId"
                            className="btn btn-sm mt-6 rounded-lg border-[#078b45] bg-[#078b45] px-5 text-sm font-semibold text-white shadow-[0_3px_0_#056c36] transition hover:border-[#06783c] hover:bg-[#06783c] active:translate-y-0.5 active:shadow-none sm:btn-md"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>

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
        </div>
    );
};

export default Banner;
