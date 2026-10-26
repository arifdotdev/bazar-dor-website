import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

interface NotFoundCardProps {
    icon: LucideIcon;
    title: string;
    message: string;
}

// shared 404 card for the global, category and product not-found pages
const NotFoundCard = ({ icon: Icon, title, message }: NotFoundCardProps) => {
    return (
        <div className="flex flex-1 items-center justify-center bg-[#F0F5F0] px-4 py-10 sm:px-6 sm:py-16">
            <div className="flex w-full max-w-xl flex-col items-center rounded-3xl bg-white px-5 py-10 text-center sm:rounded-4xl sm:px-10 sm:py-14">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-[#eaf7ee] text-[#159447] sm:size-20">
                    <Icon className="size-8 sm:size-10" />
                </div>

                <p className="mt-5 text-4xl font-bold text-[#078b45] sm:text-5xl">৪০৪</p>

                <h1 className="mt-3 text-xl font-bold text-balance text-[#202b23] sm:text-2xl">
                    {title}
                </h1>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#68736a] sm:text-base">
                    {message}
                </p>

                <Link
                    href="/"
                    className="btn btn-sm mt-7 gap-2 rounded-lg border-[#078b45] bg-[#078b45] px-5 text-sm font-semibold text-white shadow-[0_3px_0_#056c36] transition hover:border-[#06783c] hover:bg-[#06783c] active:translate-y-0.5 active:shadow-none sm:btn-md sm:text-base"
                >
                    <ArrowLeft size={16} />
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default NotFoundCard;
