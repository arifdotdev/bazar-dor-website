import { useRef } from "react";
import toast from "react-hot-toast";

export const useInvalidToast = (message = "ফর্মে কিছু ভুল আছে, লাল চিহ্নিত ঘরগুলো ঠিক করুন।") => {
    const lastToastAt = useRef(0);

    return () => {
        const now = Date.now();
        if (now - lastToastAt.current < 500) return;
        lastToastAt.current = now;
        toast.error(message);
    };
};
