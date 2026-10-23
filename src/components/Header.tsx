import Image from "next/image";
import UserInfo from "./UserInfo";
import NavLink from "./NavLink";
import { Suspense } from "react";
import Link from "next/link";

const getCategoriesData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

const Header = () => {
  // Call the function to create a Promise
  const categoriesDataPromise = getCategoriesData();

  return (
    <header className="border-neutral-900 bg-[#f8faf8]">
      <div>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo and Brand */}
          <Link href='/'>
            <div className="flex items-center gap-2">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={40}
                height={40}
                priority
                className="h-10 w-10 rounded-xl object-cover"
              />

              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-neutral-800">
                  বাজার দর
                </span>

                <span className="text-[10px] leading-4 text-neutral-600">
                  {/* Date can go here */}
                </span>
              </div>
            </div>
          </Link>

          {/* User Actions */}
          <div className="flex items-center">
            <UserInfo />
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<h2>Loading categories...</h2>}>
            <NavLink categoriesDataPromise={categoriesDataPromise} />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;