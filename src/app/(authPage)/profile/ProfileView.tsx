"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import {
    Avatar,
    Button,
    Card,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    toast,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

interface ProfileViewProps {
    user: {
        name: string;
        email: string;
        image: string | null;
    };
}

const inputClass =
    "h-12 w-full rounded-xl border border-[#e3ebe3] bg-[#f8faf8] px-4 text-base text-[#202b23] shadow-none outline-none placeholder:text-[#5b655c] focus:border-[#159447] focus:bg-white focus:ring-2 focus:ring-[#159447]/15";

const labelClass = "text-base font-semibold text-[#202b23]";

const cardClass = "w-full rounded-3xl border border-[#e3ebe3] bg-[#fbfdfb] p-6 shadow-none sm:p-8";

const ProfileView = ({ user }: ProfileViewProps) => {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "").trim();

        if (name === user.name) {
            toast.info("নামে কোনো পরিবর্তন নেই।");
            return;
        }

        setIsUpdating(true);
        const { error } = await authClient.updateUser({ name });
        setIsUpdating(false);

        if (error) {
            toast.danger("আপডেট করা যায়নি, আবার চেষ্টা করুন।");
            return;
        }

        toast.success("নাম আপডেট হয়েছে!");
        router.refresh();
    };

    const handleSignOut = async () => {
        setIsSigningOut(true);
        await authClient.signOut();
        toast.success("সাইন আউট হয়েছে।");
        router.push("/signin");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-[#F0F5F0] px-4 py-10">
            <div className="mx-auto max-w-4xl space-y-5">
                {/* title */}
                <div>
                    <h1 className="text-3xl font-extrabold text-[#202b23]">আমার প্রোফাইল</h1>
                    <p className="mt-2 text-base text-[#68736a]">
                        আপনার অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।
                    </p>
                </div>

                {/* user card */}
                <Card className={cardClass}>
                    <Card.Content className="flex flex-col gap-4 p-0 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-4">
                            <Avatar className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#eaf7ee]">
                                {user.image && (
                                    <Avatar.Image
                                        src={user.image}
                                        alt={user.name}
                                        className="size-full object-cover"
                                    />
                                )}
                                <Avatar.Fallback className="flex size-full items-center justify-center bg-[#eaf7ee] text-2xl font-bold text-[#159447]">
                                    {user.name.charAt(0).toUpperCase()}
                                </Avatar.Fallback>
                            </Avatar>

                            <div className="min-w-0">
                                <h2 className="truncate text-xl font-bold text-[#202b23]">{user.name}</h2>
                                <p className="truncate text-base text-[#68736a]">{user.email}</p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            onPress={handleSignOut}
                            isPending={isSigningOut}
                            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#dc4545] bg-white px-5 text-base font-semibold text-[#dc4545] shadow-none hover:bg-[#fceeee]"
                        >
                            <LogOut size={16} />
                            সাইন আউট
                        </Button>
                    </Card.Content>
                </Card>

                {/* info card */}
                <Card className={cardClass}>
                    <Card.Header className="p-0">
                        <Card.Title className="text-xl font-bold text-[#202b23]">তথ্য</Card.Title>
                    </Card.Header>

                    <Card.Content className="mt-5 p-0">
                        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
                            <TextField
                                isRequired
                                name="name"
                                autoComplete="name"
                                defaultValue={user.name}
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

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                isPending={isUpdating}
                                className="flex h-12 items-center justify-center rounded-xl bg-[#0f8a3c] text-base font-semibold text-white shadow-lg shadow-[#0f8a3c]/25 hover:bg-[#0c7a34]"
                            >
                                {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                            </Button>
                        </Form>
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
};

export default ProfileView;