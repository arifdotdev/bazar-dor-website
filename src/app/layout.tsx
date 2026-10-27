import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import RedirectToast from "@/components/RedirectToast";
import { Bone } from "@/components/Skeletons";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});


export const metadata: Metadata = {
  title: "বাজার দর — আজকের বাজারের দাম",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম, বাজারভিত্তিক তুলনা ও দামের পরিবর্তন এক জায়গায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header></Header>
        <Suspense fallback={<div className="border-y-2 border-gray-300 bg-[#f8faf8] px-4 py-2"><Bone className="h-5 w-full" /></div>}>
          <Marquee></Marquee>
        </Suspense>
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer></Footer>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "rounded-xl! text-sm! text-[#202b23]! sm:text-base!",
            success: { iconTheme: { primary: "#159447", secondary: "#fff" } },
            error: { iconTheme: { primary: "#dc4545", secondary: "#fff" } },
          }}
        />
        <Suspense>
          <RedirectToast />
        </Suspense>
      </body>
    </html>
  );
}
