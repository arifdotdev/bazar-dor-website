import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-1 min-h-[60vh] flex-col items-center justify-center bg-[#f8faf8] px-4 py-16 text-center">
      <p className="text-6xl font-bold text-[#078b45]">৪০৪</p>

      <h1 className="mt-4 text-2xl font-bold text-neutral-800">
        পৃষ্ঠাটি পাওয়া যায়নি
      </h1>

      <p className="mt-2 max-w-md text-sm text-neutral-600">
        আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে অথবা লিংকটি ভুল।
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#078b45] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_3px_0_#056c36] transition hover:bg-[#06783c] active:translate-y-0.5 active:shadow-none"
      >
        হোমপেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;
