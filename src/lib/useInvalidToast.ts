import { useRef } from "react";
import toast from "react-hot-toast";

// Shows one toast when a form submit is blocked by validation errors.
// The browser fires an "invalid" event per bad field, so repeats within
// a short window are ignored.
export const useInvalidToast = (message = "ফর্মে কিছু ভুল আছে, লাল চিহ্নিত ঘরগুলো ঠিক করুন।") => {
    const lastToastAt = useRef(0);

    return () => {
        const now = Date.now();
        if (now - lastToastAt.current < 500) return;
        lastToastAt.current = now;
        toast.error(message);
    };
};
