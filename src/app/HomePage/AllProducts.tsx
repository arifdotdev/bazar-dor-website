import ProductCard from "@/components/ProductCard";

interface Product {
    id: number | string;
    nameBn: string;
    image?: string;
    unit?: string;
    today: number | string;
    change?: {
        pct?: number | string;
        dir?: string;
    };
}

interface AllProductsProps {
    data: Product[];
}

const toBn = (n: number) => n.toLocaleString("bn-BD");

// Section C: every product from the API, 1 → 2 → 3 columns as the screen grows
const AllProducts = ({ data }: AllProductsProps) => {
    const products = Array.isArray(data) ? data : [];

    return (
        <>
            <h2 className="text-xl font-bold text-[#202b23]">
                সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-[#7b847c]">
                আজকের বাজারে মোট {toBn(products.length)}টি পণ্যের দাম ও পরিবর্তন
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
};

export default AllProducts;
