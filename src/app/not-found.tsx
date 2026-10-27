import { MapPinOff } from "lucide-react";
import NotFoundCard from "@/components/NotFoundCard";

const NotFound = () => {
  return (
    <NotFoundCard
      icon={MapPinOff}
      title="পৃষ্ঠাটি পাওয়া যায়নি"
      message="আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে অথবা লিংকটি ভুল। উপরের মেনু থেকে কোনো ক্যাটাগরি বেছে নিন অথবা হোম পেজে ফিরে যান।"
    />
  );
};

export default NotFound;
