import { Bone } from "@/components/Skeletons";

// sign in / sign up skeleton: title + form card (profile has its own)
const AuthLoading = () => {
    return (
        <div role="status" aria-live="polite" aria-label="লোড হচ্ছে..." className="flex flex-1 flex-col items-center justify-center bg-[#F0F5F0] px-4 py-8 sm:py-12">
            <div className="mb-6 flex w-full flex-col items-center gap-3 sm:mb-8">
                <Bone className="h-8 w-40 sm:h-9" />
                <Bone className="h-4 w-72 max-w-full" />
            </div>

            <div className="w-full max-w-lg space-y-5 rounded-3xl border border-[#e3ebe3] bg-[#fbfdfb] p-5 sm:p-8">
                {[0, 1].map((i) => (
                    <div key={i} className="space-y-2">
                        <Bone className="h-5 w-20" />
                        <Bone className="h-12 w-full rounded-xl" />
                    </div>
                ))}
                <Bone className="h-12 w-full rounded-xl" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Bone className="h-12 w-full rounded-xl" />
                    <Bone className="h-12 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default AuthLoading;
