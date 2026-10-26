"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Redirects add ?toast=<key> so the next page can explain what happened
const redirectToasts: Record<string, () => void> = {
    "social-login": () => toast.success("সফলভাবে সাইন ইন হয়েছে!", { id: "social-login" }),
    "login-required": () => toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", { id: "login-required" }),
    "already-signed-in": () => toast("আপনি ইতিমধ্যে সাইন ইন করে আছেন।", { id: "already-signed-in", icon: "👋" }),
};

// Shows the toast once, then removes ?toast from the URL
const RedirectToast = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const key = searchParams.get("toast");

    useEffect(() => {
        if (!key) return;
        redirectToasts[key]?.();

        const params = new URLSearchParams(searchParams.toString());
        params.delete("toast");
        const query = params.toString();
        router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
    }, [key, pathname, router, searchParams]);

    return null;
};

export default RedirectToast;
