import Link from "next/link";
import { use } from "react";

interface ICategory {
    id: number;
    name: string;
}

interface ICategoryResponse {
    data?: ICategory[];
}

interface NavLinkProps {
    categoriesDataPromise: Promise<ICategoryResponse>;
}

const NavLink = ({ categoriesDataPromise }: NavLinkProps) => {
    const categories = use(categoriesDataPromise);

    return (
        <nav className="flex flex-wrap items-center gap-4">
            {categories.map((category, index) => (
                <Link href={category.slug} key={index} className="cursor-pointer">
                    {category.nameBn}
                </Link>
            ))}
        </nav>
    );
};

export default NavLink;