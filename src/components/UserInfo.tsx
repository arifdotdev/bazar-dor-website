"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut, UserRound } from 'lucide-react';
import { Avatar, Dropdown } from '@heroui/react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { Bone } from './Skeletons';

const UserInfo = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("সাইন আউট হয়েছে।");
        router.push("/");
        router.refresh();
    };

    if (isPending) {
        return <Bone className="h-9 w-28 rounded-xl sm:h-11 sm:w-32" />;
    }

    if (!session) {
        return (
            <div className="flex items-center gap-1 text-sm sm:gap-2">
                <Link href={"/signin"}>
                    <button className="btn btn-sm btn-ghost rounded-xl whitespace-nowrap px-3 text-sm font-semibold text-[#202b23] transition-colors hover:bg-[#eef3ee] hover:text-[#0f8a3c] sm:btn-md sm:px-5 sm:text-base">
                        সাইন ইন
                    </button>
                </Link>
                <Link href={"/signup"}>
                    <button className="btn btn-sm whitespace-nowrap rounded-xl border-[#0f8a3c] bg-[#0f8a3c] px-3 text-sm font-semibold text-white shadow-md shadow-[#0f8a3c]/30 transition-colors hover:border-[#0c7a34] hover:bg-[#0c7a34] sm:btn-md sm:px-6 sm:text-base">
                        সাইন আপ
                    </button>
                </Link>
            </div>
        );
    }

    const { user } = session;
    const firstName = user.name.split(" ")[0];

    return (
        <Dropdown>
            <Dropdown.Trigger className="flex cursor-pointer items-center gap-3 rounded-xl px-1 py-1 outline-none transition-colors hover:bg-[#eef3ee] focus-visible:ring-2 focus-visible:ring-[#159447]/30">
                <Avatar className="flex size-10 shrink-0 sm:size-11 items-center justify-center overflow-hidden rounded-xl bg-[#eaf7ee]">
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
                className="w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-2 shadow-lg"
            >
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