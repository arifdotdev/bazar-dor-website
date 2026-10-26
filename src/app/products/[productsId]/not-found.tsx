import { SearchX } from "lucide-react";
import NotFoundCard from "@/components/NotFoundCard";

// shown when the product id doesn't exist
const ProductNotFound = () => {
    return (
        <NotFoundCard
            icon={SearchX}
            title="পণ্যটি পাওয়া যায়নি"
            message="এই পণ্যটি হয়তো নেই অথবা লিংকটি ভুল। উপরের মেনু থেকে কোনো ক্যাটাগরি বেছে নিন অথবা হোম পেজে ফিরে যান।"
        />
    );
};

export default ProductNotFound;
