export const Spinner = ({ className = "" }: { className?: string }) => (
    <span
        aria-hidden="true"
        className={`inline-block size-12 animate-spin rounded-full border-4 border-[#e3ebe3] border-t-[#0f8a3c] motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
    />
);

export const PageSpinner = ({ className = "" }: { className?: string }) => (
    <div
        role="status"
        aria-live="polite"
        aria-label="লোড হচ্ছে..."
        className={`flex min-h-[60vh] flex-1 flex-col items-center justify-center gap-4 bg-[#F0F5F0] px-4 ${className}`}
    >
        <Spinner />
        <p className="text-sm font-medium text-[#5b6b5f]">লোড হচ্ছে...</p>
    </div>
);
