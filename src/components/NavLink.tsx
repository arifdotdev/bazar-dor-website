'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

interface ICategory {
    id: number;
    name: string;
    nameBn: string;
    slug: string;
}

interface NavLinkProps {
    categoriesDataPromise: Promise<ICategory[]>;
}

const linkClass = (isActive: boolean) =>
    `inline-block cursor-pointer whitespace-nowrap rounded-md px-3 py-2 transition-colors ${isActive
        ? "bg-green-600 text-white"
        : "text-gray-800 hover:bg-green-100"
    }`;

const NavLink = ({ categoriesDataPromise }: NavLinkProps) => {
    const categories = use(categoriesDataPromise);
    const pathname = decodeURIComponent(usePathname());
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const links = [
        { href: "/", label: "হোম" },
        ...categories.map((category) => ({ href: `/category/${category.slug}`, label: category.nameBn })),
    ];

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            setIsOpen(false);
            buttonRef.current?.focus();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    return (
        <nav className="relative px-4 py-2 font-bold sm:px-6 md:py-4">
            {isOpen && <div aria-hidden onClick={() => setIsOpen(false)} className="fixed inset-0 z-30 md:hidden" />}

            <div className="relative z-40 flex items-center md:hidden">
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setIsOpen((open) => !open)}
                    aria-label="মেনু"
                    aria-expanded={isOpen}
                    aria-controls="category-menu"
                    className="flex size-10 cursor-pointer items-center justify-center rounded-md text-gray-800 hover:bg-green-100"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <div
                id="category-menu"
                className={`${isOpen ? "flex" : "hidden"} absolute inset-x-4 top-full z-40 flex-col gap-1 rounded-md border border-gray-200 bg-white p-2 shadow-md sm:inset-x-6 md:static md:flex md:flex-row md:flex-wrap md:items-center md:gap-3 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
            >
                {links.map((link) => {
                    const isActive = link.href === pathname;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            aria-current={isActive ? 'page' : undefined}
                            className={linkClass(isActive)}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default NavLink;
