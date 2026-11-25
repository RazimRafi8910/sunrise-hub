import type { UserRole } from "@sunrise-hub/shared";
import { Link } from "react-router";

export interface RulesCardProps {
    userRole: UserRole
}

export default function RulesCard({ userRole }: RulesCardProps) {
    const description = userRole == "student" ? "Rules You Can Report Against" : "Review Rules that can be Report"
    const heading = userRole == "student" ? "Rules Book" : "Review Rules";
    return (
        <Link
            to={'/rules'}
            className="flex min-h-[76px] items-center gap-3.5 rounded-[20px] border border-[#F5C563] bg-white p-4 shadow-[0_4px_16px_rgba(27,33,66,0.05)] motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
        >
            <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FFB020] text-[#1B2142]"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                >
                    <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="2" width="6" height="4" rx="1" />
                    <path d="M9 12h6" />
                    <path d="M9 16h6" />
                    <path d="M7 12h.01" />
                    <path d="M7 16h.01" />
                </svg>
            </span>

            <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                    <span className="text-[15px] font-extrabold leading-snug text-[#1B2142]">
                        {heading}
                    </span>
                    {/* {extraCount > 0 ? (
            <span className="rounded-full bg-[#9A3412]/12 px-2 py-0.5 text-[11px] font-bold text-[#9A3412]">
              +{extraCount} more
            </span>
          ) : null} */}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-[#1B2142]/75">
                    {description}
                </span>
            </span>

            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 shrink-0 text-[#9A3412]"
            >
                <path d="m9 18 6-6-6-6" />
            </svg>
        </Link>
    )
}