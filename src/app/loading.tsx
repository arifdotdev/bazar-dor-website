const Loading = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-1 min-h-[60vh] flex-col items-center justify-center gap-3 bg-[#f8faf8]"
    >
      <span className="loading loading-spinner loading-lg text-green-600"></span>
      <p className="text-sm text-neutral-600">লোড হচ্ছে...</p>
    </div>
  );
};

export default Loading;
