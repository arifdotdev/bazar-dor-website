import { PackageSearch } from "lucide-react";
import NotFoundCard from "@/components/NotFoundCard";

// shown when a category has no products or the slug doesn't exist
const CategoryNotFound = () => {
    return (
        <NotFoundCard
            icon={PackageSearch}
            title="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি"
            message="ক্যাটাগরিটি হয়তো নেই অথবা লিংকটি ভুল। উপরের মেনু থেকে অন্য ক্যাটাগরি বেছে নিন অথবা হোম পেজে ফিরে যান।"
        />
    );
};

export default CategoryNotFound;
