import { Bone } from "@/components/Skeletons";

const cardClass = "w-full rounded-3xl border border-[#e3ebe3] bg-[#fbfdfb] p-5 sm:p-8";

// profile skeleton: title, user card, name form
const ProfileLoading = () => {
    return (
        <div role="status" aria-live="polite" aria-label="লোড হচ্ছে..." className="flex-1 bg-[#F0F5F0] px-4 py-8 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-4xl space-y-5">
                <div className="space-y-3">
                    <Bone className="h-8 w-48 sm:h-9" />
                    <Bone className="h-4 w-72 max-w-full" />
                </div>

                <div className={`${cardClass} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
                    <div className="flex w-full items-center gap-4">
                        <Bone className="size-16 shrink-0 rounded-2xl" />
                        <div className="w-full space-y-2">
                            <Bone className="h-6 w-40" />
                            <Bone className="h-4 w-56 max-w-full" />
                        </div>
                    </div>
                    <Bone className="h-11 w-full shrink-0 rounded-xl sm:w-32" />
                </div>

                <div className={`${cardClass} space-y-5`}>
                    <Bone className="h-6 w-16" />
                    <div className="space-y-2">
                        <Bone className="h-5 w-12" />
                        <Bone className="h-12 w-full rounded-xl" />
                    </div>
                    <Bone className="h-12 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default ProfileLoading;
