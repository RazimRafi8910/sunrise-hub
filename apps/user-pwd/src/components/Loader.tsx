
import React from "react";

interface LoaderProps {
    message?: string;
    fullScreen?: boolean;
    size?: "sm" | "md" | "lg";
}

export default function Loader({
    message = "Loading...",
    fullScreen = false,
    size = "md",
}: LoaderProps) {
    const sizes = {
        sm: "size-6 border-[3px]",
        md: "size-10 border-4",
        lg: "size-14 border-[5px]",
    };

    return (
        <div
            className={`flex flex-col items-center justify-center gap-4 ${
                fullScreen ? "min-h-screen w-full bg-[#FFF7E9]" : "w-full py-12"
            }`}
        >
            <div
                className={`${sizes[size]} animate-spin rounded-full border-[#E8E5DF] border-t-[#FFB020]`}
            />

            {message && (
                <p className="text-sm font-semibold text-[#1B2142]">
                    {message}
                </p>
            )}
        </div>
    );
}
