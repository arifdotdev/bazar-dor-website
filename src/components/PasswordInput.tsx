'use client'
import { useState, type ComponentProps } from "react";
import { Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ className = "", ...props }: ComponentProps<typeof Input>) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative w-full">
            <Input
                {...props}
                type={isVisible ? "text" : "password"}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className={`${className} pr-12`}
            />
            <button
                type="button"
                onClick={() => setIsVisible((visible) => !visible)}
                aria-label={isVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
                aria-pressed={isVisible}
                className="absolute top-1/2 right-0.5 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-[#68736a] transition-colors hover:text-[#202b23] focus-visible:outline-2 focus-visible:outline-[#159447]"
            >
                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
};

export default PasswordInput;
