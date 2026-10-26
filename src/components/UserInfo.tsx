"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut, UserRound } from 'lucide-react';
import { Avatar, Dropdown, toast } from '@heroui/react';
import { authClient } from '@/lib/auth-client';

const UserInfo = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("সাইন আউট হয়েছে।");
        router.push("/");
        router.refresh();
    };

    // session still loading → keep the space empty so the buttons don't flash
    if (isPending) {
        return <div className="h-11 w-32 animate-pulse rounded-xl bg-[#eef3ee]" />;
    }

    // signed out → sign in / sign up buttons
    if (!session) {
        return (
            <div className="flex items-center gap-3 text-sm">
                <div>
                    <Link href={"/signin"}>
                        <button className="btn btn-ghost rounded-xl px-5 text-base font-semibold text-[#202b23] transition-colors hover:bg-[#eef3ee] hover:text-[#0f8a3c]">
                            সাইন ইন
                        </button>
                    </Link>
                    <Link href={"/signup"}>
                        {" "}
                        <button className="btn rounded-xl border-[#0f8a3c] bg-[#0f8a3c] px-6 text-base font-semibold text-white shadow-md shadow-[#0f8a3c]/30 transition-colors hover:border-[#0c7a34] hover:bg-[#0c7a34]">
                            সাইন আপ
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // signed in → avatar + name with dropdown
    const { user } = session;
    const firstName = user.name.split(" ")[0];

    return (
        <Dropdown>
            <Dropdown.Trigger className="flex cursor-pointer items-center gap-3 rounded-xl px-1 py-1 outline-none transition-colors hover:bg-[#eef3ee] focus-visible:ring-2 focus-visible:ring-[#159447]/30">
                <Avatar className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eaf7ee]">
                    {user.image && (
                        <Avatar.Image
                            src={user.image}
                            alt={user.name}
                            className="size-full object-cover"
                        />
                    )}
                    <Avatar.Fallback className="flex size-full items-center justify-center bg-[#eaf7ee] text-lg font-bold text-[#159447]">
                        {user.name.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                </Avatar>

                <span className="hidden max-w-32 truncate text-base font-medium text-[#202b23] sm:block">
                    {firstName}
                </span>
                <ChevronDown size={14} className="hidden text-[#68736a] sm:block" />
            </Dropdown.Trigger>

            <Dropdown.Popover
                placement="bottom end"
                className="w-72 rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-2 shadow-lg"
            >
                {/* user name and email */}
                <div className="px-3 pt-2 pb-3">
                    <p className="truncate text-base font-semibold text-[#202b23]">{user.name}</p>
                    <p className="truncate text-sm text-[#68736a]">{user.email}</p>
                </div>

                <Dropdown.Menu
                    aria-label="ব্যবহারকারী মেনু"
                    className="outline-none"
                    onAction={(key) => {
                        if (key === "profile") {
                            router.push("/profile");
                        }
                        if (key === "signout") {
                            handleSignOut();
                        }
                    }}
                >
                    <Dropdown.Item
                        id="profile"
                        textValue="আমার প্রোফাইল"
                        className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-base text-[#202b23] outline-none data-[focused]:bg-[#eef3ee]"
                    >
                        <UserRound size={16} />
                        আমার প্রোফাইল
                    </Dropdown.Item>
                    <Dropdown.Item
                        id="signout"
                        textValue="সাইন আউট"
                        variant="danger"
                        className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-base text-[#dc4545] outline-none data-[focused]:bg-[#fceeee]"
                    >
                        <LogOut size={16} />
                        সাইন আউট
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
};

export default UserInfo;