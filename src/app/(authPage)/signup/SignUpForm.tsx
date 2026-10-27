"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
    Button,
    Card,
    FieldError,
    Form,
    Input,
    Label,
    Link,
    Separator,
    TextField,
} from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useInvalidToast } from "@/lib/useInvalidToast";

const inputClass =
    "h-12 w-full rounded-xl border border-[#e3ebe3] bg-[#f8faf8] px-4 text-base text-[#202b23] shadow-none outline-none placeholder:text-[#5b655c] focus:border-[#159447] focus:bg-white focus:ring-2 focus:ring-[#159447]/15";

const labelClass = "text-base font-semibold text-[#202b23]";

const socialButtonClass =
    "flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#e3ebe3] bg-white text-[15px] font-semibold text-[#202b23] transition-colors hover:bg-[#f0f5f0] cursor-pointer";

const SignUpForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const showInvalidToast = useInvalidToast();

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();

        setIsLoading(true);
        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
        });
        setIsLoading(false);

        if (data) {
            toast.success("অ্যাকাউন্ট তৈরি হয়েছে! স্বাগতম।");
            router.push("/");
        }

        if (error) {
            if (error.code?.startsWith("USER_ALREADY_EXISTS")) {
                toast.error("এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।");
            } else if (error.code === "PASSWORD_TOO_SHORT") {
                toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            } else {
                toast.error("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।");
            }
        }
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        const result = await authClient.signIn.social({ provider, callbackURL: "/?toast=social-login" }).catch(() => null);
        if (!result || result.error) {
            toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন।");
        }
    };

    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-[#F0F5F0] px-4 py-8 sm:py-12">
            <div className="mb-6 text-center sm:mb-8">
                <h1 className="text-2xl font-extrabold text-[#202b23] sm:text-3xl">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="mt-3 text-sm text-[#68736a] sm:text-base">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <Card className="w-full max-w-lg rounded-3xl border border-[#e3ebe3] bg-[#fbfdfb] p-5 shadow-none sm:p-8">
                <Card.Content className="flex flex-col gap-6 p-0">
                    <Form className="flex flex-col gap-5" onSubmit={handleFormSubmit} onInvalid={showInvalidToast}>
                        <TextField
                            isRequired
                            name="name"
                            autoComplete="name"
                            className="flex w-full flex-col gap-2"
                            validate={(value) => {
                                if (value.trim().length < 2) {
                                    return "আপনার নাম লিখুন";
                                }
                                return null;
                            }}
                        >
                            <Label className={labelClass}>নাম</Label>
                            <Input fullWidth placeholder="যেমন: রহিম উদ্দিন" className={inputClass} />
                            <FieldError className="text-sm text-[#dc4545]" />
                        </TextField>

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="flex w-full flex-col gap-2"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "সঠিক ইমেইল ঠিকানা লিখুন";
                                }
                                return null;
                            }}
                        >
                            <Label className={labelClass}>ইমেইল</Label>
                            <Input fullWidth placeholder="you@example.com" className={inputClass} />
                            <FieldError className="text-sm text-[#dc4545]" />
                        </TextField>

                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={setPassword}
                            className="flex w-full flex-col gap-2"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "অন্তত একটি বড় হাতের অক্ষর (A-Z) দিন";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "অন্তত একটি সংখ্যা (0-9) দিন";
                                }
                                return null;
                            }}
                        >
                            <Label className={labelClass}>পাসওয়ার্ড</Label>
                            <Input fullWidth placeholder="কমপক্ষে ৮ অক্ষর" className={inputClass} />
                            <FieldError className="text-sm text-[#dc4545]" />
                        </TextField>

                        <TextField
                            isRequired
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            className="flex w-full flex-col gap-2"
                            validate={(value) => {
                                if (value.length === 0) {
                                    return "পাসওয়ার্ডটি আবার লিখুন";
                                }
                                if (value !== password) {
                                    return "পাসওয়ার্ড দুটি মেলেনি";
                                }
                                return null;
                            }}
                        >
                            <Label className={labelClass}>পাসওয়ার্ড নিশ্চিত করুন</Label>
                            <Input fullWidth placeholder="আবার লিখুন" className={inputClass} />
                            <FieldError className="text-sm text-[#dc4545]" />
                        </TextField>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            isPending={isLoading}
                            className="h-12 rounded-xl bg-[#0f8a3c] text-base font-semibold text-white shadow-lg shadow-[#0f8a3c]/25 hover:bg-[#0c7a34]"
                        >
                            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
                        </Button>
                    </Form>

                    <div className="flex items-center gap-4">
                        <Separator className="flex-1 bg-[#e3ebe3]" />
                        <span className="text-sm text-[#202b23]">অথবা</span>
                        <Separator className="flex-1 bg-[#e3ebe3]" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button type="button" onClick={() => handleSocialSignIn("google")} className={socialButtonClass}>
                            <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Google দিয়ে চালিয়ে যান
                        </button>
                        <button type="button" onClick={() => handleSocialSignIn("github")} className={socialButtonClass}>
                            <svg aria-label="GitHub logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>
                </Card.Content>

                <Card.Footer className="mt-6 justify-center gap-1 p-0 text-base text-[#202b23]">
                    <span>অ্যাকাউন্ট আছে?</span>
                    <Link
                        href="/signin"
                        className="font-medium text-[#159447] no-underline hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </Card.Footer>
            </Card>

            <Link
                href="/"
                className="mt-8 inline-flex items-center gap-1.5 text-base text-[#68736a] no-underline hover:text-[#202b23]"
            >
                <ArrowLeft size={16} />
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default SignUpForm;