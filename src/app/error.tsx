"use client";

import Link from "next/link";
import { ArrowLeft, RotateCw, TriangleAlert } from "lucide-react";

const ErrorPage = ({ reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    return (
        <div className="flex flex-1 items-center justify-center bg-[#F0F5F0] px-4 py-10 sm:px-6 sm:py-16">
            <div className="flex w-full max-w-xl flex-col items-center rounded-3xl bg-white px-5 py-10 text-center sm:rounded-4xl sm:px-10 sm:py-14">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-[#fceeee] text-[#dc4545] sm:size-20">
                    <TriangleAlert className="size-8 sm:size-10" />
                </div>

                <h1 className="mt-5 text-xl font-bold text-balance text-[#202b23] sm:text-2xl">
                    দাম লোড করা যায়নি
                </h1>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#68736a] sm:text-base">
                    সার্ভারের সাথে সংযোগে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <button
                        onClick={reset}
                        className="btn btn-sm gap-2 rounded-lg border-[#078b45] bg-[#078b45] px-5 text-sm font-semibold text-white hover:border-[#06783c] hover:bg-[#06783c] sm:btn-md sm:text-base"
                    >
                        <RotateCw size={16} />
                        আবার চেষ্টা করুন
                    </button>
                    <Link
                        href="/"
                        className="btn btn-sm btn-ghost gap-2 rounded-lg px-5 text-sm font-semibold text-[#202b23] hover:bg-[#eef3ee] sm:btn-md sm:text-base"
                    >
                        <ArrowLeft size={16} />
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
