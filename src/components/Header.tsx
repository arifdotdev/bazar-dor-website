import Image from "next/image";
import UserInfo from "./UserInfo";
import NavLink from "./NavLink";
import { Suspense } from "react";
import Link from "next/link";
import { NavSkeleton } from "./Skeletons";
import TodayDate from "./TodayDate";

const getCategoriesData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
};

const Header = () => {
  const categoriesDataPromise = getCategoriesData();

  return (
    <header className="border-neutral-900 bg-[#f8faf8]">
      <div>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href='/' aria-label="বাজার দর — হোম" className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#0f8a3c] sm:size-10">
                <Image
                  src="/logo-icon.png"
                  alt="বাজার দর"
                  width={24}
                  height={24}
                  priority
                  className="size-6"
                />
              </div>

              <div className="hidden min-w-0 flex-col min-[320px]:flex">
                <span className="text-base font-bold leading-tight text-neutral-800 sm:text-lg">
                  বাজার দর
                </span>

                <TodayDate
                  className="whitespace-nowrap text-[10px] leading-4 text-neutral-600 sm:text-xs"
                  weekdayClassName="hidden min-[400px]:inline"
                />
              </div>
            </div>
          </Link>

          <div className="flex shrink-0 items-center">
            <UserInfo />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<NavSkeleton />}>
            <NavLink categoriesDataPromise={categoriesDataPromise} />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;