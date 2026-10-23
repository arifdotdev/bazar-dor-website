'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

interface ICategory {
    id: number;
    name: string;
    nameBn: string;
    slug: string;
}

interface NavLinkProps {
    categoriesDataPromise: Promise<ICategory[]>;
}

const NavLink = ({ categoriesDataPromise }: NavLinkProps) => {
    const categories = use(categoriesDataPromise);
    const pathname = decodeURIComponent(usePathname());

    return (
        <nav className="flex flex-wrap items-center gap-5 font-bold py-5">
            <div>
                <Link href={'/'}>হোম </Link>
            </div>
            {categories.map((category) => {
                const href = `/category/${category.slug}`;
                const isActive = pathname === href;

                return (
                    <div key={category.id}>
                        <Link
                            href={href}
                            key={category.id}
                            className={`cursor-pointer rounded-md px-3 py-2 transition-colors ${isActive
                                ? "bg-green-600 text-white"
                                : "text-gray-800 hover:bg-green-100"
                                }`}
                        >
                            {category.nameBn}
                        </Link>
                    </div>
                )
            })}
        </nav>
    );
};

export default NavLink;