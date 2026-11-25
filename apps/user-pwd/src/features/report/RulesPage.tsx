import { useState } from "react";
import { Link } from "react-router";
import useFetch from "../../hooks/useFetch";
import { createRuleSchema, type ApiResponse, type Rules } from "@sunrise-hub/shared";
import Loader from "../../components/Loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/api";

const sampleRules = [
    {
        id: 1,
        name: "Maintain Discipline",
        description:
            "All students are expected to maintain proper discipline and respect fellow students and staff members.",
    },
    {
        id: 2,
        name: "Dress Code",
        description:
            "Students must follow the prescribed dress code while attending college activities and events.",
    },
    {
        id: 3,
        name: "Attendance Policy",
        description:
            "Students should maintain the required attendance percentage and attend all scheduled academic sessions.",
    },
    {
        id: 4,
        name: "Campus Cleanliness",
        description:
            "Every student is responsible for maintaining cleanliness across the campus and disposing of waste properly.",
    },
];

function PlusIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="size-5">
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            className="size-[18px]">
            <path d="m16 4 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15z" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            className="size-[18px]">
            <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
        </svg>
    );
}


export function RulesPage({ }: {}) {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { data: rules,setData, loading: initialLoading } = useFetch<Rules[]>('/report/rules', { method: "GET" });
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(createRuleSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true)
    console.log(data)
    try {
      const result = await api<Rules>('/report/rules', { method: "POST",body:JSON.stringify(data) });
      if (result.success) {
        setData((prev) => [...prev, result.data]);
      }
    } catch (e) {
      setError("Failed to create Rule")
    } finally {
      setLoading(false)
    }
  }

  if (loading || initialLoading) {
    return <Loader />
  }

    return (
        <div
            className="min-h-dvh w-full bg-[#FFF7EA] text-[#1B2142] md:flex"
            style={{ fontFamily: 'var(--font-report)' }}
        >

            <div className="min-w-0 flex-1">
                <header className="rounded-b-[24px] bg-[#1B2142] px-5 pt-[max(20px,env(safe-area-inset-top))] pb-6 text-white md:rounded-b-[32px] md:px-8 md:py-7 lg:px-10">
                    <Link
                        to="/report"
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-bold text-[#FFB020] motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-4"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to Reports
                    </Link>
                    <h1 className="mt-1 text-[24px] font-extrabold tracking-[-0.02em] md:text-[28px]">
                        Rules Book
                    </h1>
                    <p className="mt-0.5 text-[14px] text-white/75">Conduct guidelines and dress code</p>
                </header>

                <main className="mx-auto max-w-7xl space-y-8 px-5 py-9 sm:px-8 lg:px-12">

                    {/* Add Rule Form */}
                    <section className="rounded-[28px] border border-[#EFE8DC] bg-white p-6 shadow-[0_8px_30px_rgba(27,33,66,0.05)] sm:p-8">
                        <div className="mb-7 flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#FFF3D9] text-[#1B2142]">
                                <PlusIcon />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold">
                                    Add New Rule
                                </h2>
                                <p className="mt-1 text-sm text-[#777B87]">
                                    Create a new guideline for students
                                </p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-bold">
                                    Rule Name
                                </label>
                                <input
                    type="text"
                  name="name"
                    {...register("name")}
                                    placeholder="e.g. Maintain Discipline"
                                    className="w-full rounded-xl border border-[#E8E5DF] bg-[#FFFEFC] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A5A5A5] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                                />
                            </div>
                            {errors.name && (
                              <p role="alert" className="text-[12px] font-semibold text-danger">
                                {errors.name.message}
                              </p>
                            )}
                            <div>
                                <label className="mb-2 block text-sm font-bold">
                                    Description
                                </label>
                                <textarea
                    rows={2}
                  name="description"
                    {...register("description")}
                                    placeholder="Write the rule description..."
                                    className="w-full resize-none rounded-xl border border-[#E8E5DF] bg-[#FFFEFC] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A5A5A5] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                                />
                            </div>
                            {errors.description && (
                              <p role="alert" className="text-[12px] font-semibold text-danger">
                                {errors.description.message}
                              </p>
                            )}
                            <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFB020] px-6 py-3.5 text-sm font-extrabold text-[#1B2142] transition hover:bg-[#F5A410] sm:w-auto"
                  >
                                    <PlusIcon />
                                    Add Rule
                                </button>
                            </div>
                </div>
                        </form>
                    </section>

                    {/* Rules List */}
                    <section>
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-extrabold">
                                    All Rules
                                </h2>
                                <p className="mt-1 text-sm text-[#777B87]">
                                    Conduct guidelines and policies
                                </p>
                            </div>

                            <span className="rounded-full bg-[#FFEDC9] px-4 py-2 text-xs font-bold text-[#8A5A00]">
                                {sampleRules.length} Rules
                            </span>
                        </div>

                        <div className="space-y-3">
                            {rules.map((rule, index) => (
                                <article
                                    key={rule.id}
                                    className="group flex gap-4 rounded-2xl border border-[#EFE8DC] bg-white p-5 shadow-[0_4px_16px_rgba(27,33,66,0.035)] transition hover:border-[#FFCA65] sm:items-center sm:p-6"
                                >
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3D9] text-sm font-extrabold text-[#9A6400]">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-bold text-[#1B2142]">
                                            {rule.name}
                                        </h3>
                                        <p className="mt-1.5 text-sm leading-6 text-[#777B87]">
                                            {rule.description}
                                        </p>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                                        <button
                                            aria-label="Edit rule"
                                            className="flex size-9 items-center justify-center rounded-lg bg-[#F3F4F7] text-[#1B2142] transition hover:bg-[#FFF0D0] hover:text-[#A66A00]"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            aria-label="Delete rule"
                                            className="flex size-9 items-center justify-center rounded-lg bg-[#FFF0EE] text-[#D85B50] transition hover:bg-[#FFE0DC]"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                </main>
            </div>
        </div>
    )
}
