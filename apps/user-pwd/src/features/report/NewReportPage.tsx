import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'
import { BottomNav } from './BottomNav'
import { StatusPill } from './StatusPill'
import type { Report } from './types'

export interface NewReportDraft {
  violationType: string
  studentAccount: string
  studentDescription: string
  photos: File[]
  occurredAt: string
  location: string
  notes: string
}

export interface NewReportPageProps {
  violationOptions?: string[]
  recentReports?: Report[]
  onSubmit?: (draft: NewReportDraft) => void
}

interface PhotoItem {
  id: string
  file: File
  previewUrl: string
}

const DEFAULT_VIOLATIONS = [
  'Uniform',
  'ID card',
  'Late entry',
  'Phone use in class',
]

const DEFAULT_RECENT_REPORTS: Report[] = [
  {
    id: 'rep-2',
    ruleTitle: 'Uniform',
    dateLabel: 'Yesterday',
    location: 'Library',
    status: 'under_review',
  },
  {
    id: 'rep-3',
    ruleTitle: 'ID card',
    dateLabel: '18 Nov',
    location: 'Main gate',
    status: 'verified',
  },
  {
    id: 'rep-4',
    ruleTitle: 'Late entry',
    dateLabel: '9 Nov',
    location: 'Main gate',
    status: 'closed',
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'You submit the report',
    description: 'It goes straight to the review queue.',
  },
  {
    step: '2',
    title: 'A reviewer checks it',
    description:
      'They look at the photos and confirm the violation, or reject the report.',
  },
  {
    step: '3',
    title: 'You are notified',
    description:
      'You see the result in Notifications. If it is verified, the student is told too.',
  },
]

const MAX_PHOTOS = 3

function formatCurrentLocalDateTime(): string {
  const now = new Date()
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`
}

function StepHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1B2142] text-[13px] font-extrabold text-white"
      >
        {step}
      </span>
      <h2 className="text-[17px] font-extrabold tracking-[-0.01em] text-[#1B2142]">
        {title}
      </h2>
    </div>
  )
}

export function NewReportPage({
  violationOptions = DEFAULT_VIOLATIONS,
  recentReports = DEFAULT_RECENT_REPORTS,
  onSubmit,
}: NewReportPageProps) {
  const accountInputId = useId()
  const descriptionInputId = useId()
  const whenInputId = useId()
  const whereInputId = useId()
  const notesInputId = useId()

  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const photosRef = useRef<PhotoItem[]>([])

  const [selectedViolation, setSelectedViolation] = useState<string>(
    violationOptions[0] ?? 'Uniform',
  )
  const [studentAccount, setStudentAccount] = useState('')
  const [studentDescription, setStudentDescription] = useState('')
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [occurredAt, setOccurredAt] = useState(formatCurrentLocalDateTime)
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    photosRef.current = photos
  }, [photos])

  useEffect(() => {
    return () => {
      for (const item of photosRef.current) {
        URL.revokeObjectURL(item.previewUrl)
      }
    }
  }, [])

  function handleFilesAdded(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files
    if (!fileList || fileList.length === 0) return

    const remainingSlots = MAX_PHOTOS - photos.length
    if (remainingSlots <= 0) {
      event.target.value = ''
      return
    }

    const added: PhotoItem[] = Array.from(fileList)
      .slice(0, remainingSlots)
      .map((file, index) => ({
        id: `${file.name}-${Date.now()}-${index}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }))

    setPhotos((prev) => [...prev, ...added])
    setFormError(null)
    setSubmitted(false)
    event.target.value = ''
  }

  function handleRemovePhoto(id: string) {
    setPhotos((prev) => {
      const target = prev.find((item) => item.id === id)
      if (target) {
        URL.revokeObjectURL(target.previewUrl)
      }
      return prev.filter((item) => item.id !== id)
    })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!selectedViolation) {
      setFormError('Please select what the violation was.')
      return
    }

    if (!studentAccount.trim() && !studentDescription.trim()) {
      setFormError(
        'Please enter the student account or describe who it was.',
      )
      return
    }

    if (photos.length === 0) {
      setFormError('Please add at least 1 photo as evidence.')
      return
    }

    setFormError(null)
    setSubmitted(true)
    onSubmit?.({
      violationType: selectedViolation,
      studentAccount: studentAccount.trim(),
      studentDescription: studentDescription.trim(),
      photos: photos.map((item) => item.file),
      occurredAt,
      location: location.trim(),
      notes: notes.trim(),
    })
  }

  return (
    <div
      className="min-h-dvh w-full bg-[#FFF7EA] text-[#1B2142] md:flex"
      style={{ fontFamily: 'var(--font-report)' }}
    >
      {/* <BottomNav /> */}

      <div className="min-w-0 flex-1">
        <main className="mx-auto w-full max-w-[1120px] pt-[max(20px,env(safe-area-inset-top))] pb-[112px] md:px- md:py-2 md:pb-12 lg:px-">
          {/* Breadcrumb + Page title */}
          <header className="mb-5 md:mb-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] font-semibold">
              <Link
                to="/report"
                className="inline-flex min-h-[36px] items-center text-[#1B2142]/65 hover:text-[#1B2142] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
              >
                Reports
              </Link>
              <span aria-hidden="true" className="text-[#1B2142]/40">
                /
              </span>
              <span className="text-[#1B2142]">New report</span>
            </nav>

            <h1 className="mt-1 text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-[#1B2142] md:text-[32px]">
              Report a violation
            </h1>
            <p className="mt-1 max-w-[560px] text-[14px] leading-relaxed text-[#1B2142]/70">
              Tell us what you saw and add a photo. A reviewer will check it and
              take it from there.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start lg:gap-6">
            {/* Main Form Column */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4 lg:col-span-8 lg:gap-5"
            >
              {/* Step 1: Violation type */}
              <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_16px_rgba(27,33,66,0.08)] md:p-6">
                <StepHeading step={1} title="What was the violation?" />

                <div
                  role="group"
                  aria-label="Violation type"
                  className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3"
                >
                  {violationOptions.map((option) => {
                    const isSelected = selectedViolation === option
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setSelectedViolation(option)
                          setFormError(null)
                        }}
                        className={`flex min-h-[48px] items-center justify-center rounded-[14px] border px-4 py-2.5 text-center text-[14px] motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142] ${isSelected
                          ? 'border-[#F4C152] bg-[#FEF3D6] font-extrabold text-[#1B2142]'
                          : 'border-[#1B2142]/15 bg-white font-semibold text-[#1B2142] hover:border-[#1B2142]/30'
                          }`}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Step 2: Who was it */}
              <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_16px_rgba(27,33,66,0.08)] md:p-6">
                <StepHeading step={2} title="Who was it?" />

                <div className="mt-4">
                  <label
                    htmlFor={accountInputId}
                    className="block text-[13px] font-bold text-[#1B2142]"
                  >
                    Student account{' '}
                    <span className="font-normal text-[#1B2142]/60">
                      (if you know it)
                    </span>
                  </label>
                  <input
                    id={accountInputId}
                    type="text"
                    value={studentAccount}
                    onChange={(event) => setStudentAccount(event.target.value)}
                    placeholder="Search by name or ID"
                    className="mt-1.5 min-h-[44px] w-full rounded-[14px] border border-[#1B2142]/15 bg-white px-3.5 py-2.5 text-[14px] text-[#1B2142] placeholder:text-[#1B2142]/45 focus:border-[#1B2142] focus:outline-none"
                  />
                </div>

                <div className="my-4 flex items-center gap-3" aria-hidden="true">
                  <div className="h-px flex-1 bg-[#1B2142]/10" />
                  <span className="text-[12px] font-semibold text-[#1B2142]/50">
                    or
                  </span>
                  <div className="h-px flex-1 bg-[#1B2142]/10" />
                </div>

                <div>
                  <label
                    htmlFor={descriptionInputId}
                    className="block text-[13px] font-bold text-[#1B2142]"
                  >
                    What do you know about them?
                  </label>
                  <textarea
                    id={descriptionInputId}
                    rows={3}
                    value={studentDescription}
                    onChange={(event) =>
                      setStudentDescription(event.target.value)
                    }
                    placeholder="Class, year, what they were wearing"
                    className="mt-1.5 w-full resize-y rounded-[14px] border border-[#1B2142]/15 bg-white px-3.5 py-2.5 text-[14px] text-[#1B2142] placeholder:text-[#1B2142]/45 focus:border-[#1B2142] focus:outline-none"
                  />
                  <p className="mt-1.5 text-[12px] leading-snug text-[#1B2142]/65">
                    Add the account or a description. If you are not sure who it
                    is, a reviewer will find out.
                  </p>
                </div>
              </section>

              {/* Step 3: Photo evidence */}
              <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_16px_rgba(27,33,66,0.08)] md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <StepHeading step={3} title="Add photo evidence" />
                  <span className="rounded-full bg-[#ECEAFE]/80 px-3 py-1 text-[12px] font-bold text-[#1B2142]">
                    {photos.length} of {MAX_PHOTOS} added
                  </span>
                </div>

                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  capture="environment"
                  onChange={handleFilesAdded}
                  className="sr-only"
                  aria-label="Take a photo with camera"
                />
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFilesAdded}
                  className="sr-only"
                  aria-label="Choose photos from files"
                />

                <div className="mt-4 rounded-[18px] border-[1.5px] border-dashed border-[#D9B882] bg-[#FFFDF8] px-4 py-5 text-center">
                  <p className="text-[13px] font-bold text-[#1B2142]">
                    Add 1 to 3 photos. At least one is required.
                  </p>

                  <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      type="button"
                      disabled={photos.length >= MAX_PHOTOS}
                      onClick={() => cameraInputRef.current?.click()}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[14px] bg-[#FFB020] px-4 py-2 text-[14px] font-extrabold text-[#1B2142] disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                        <circle cx="12" cy="13" r="3.5" />
                      </svg>
                      Take a photo
                    </button>

                    <button
                      type="button"
                      disabled={photos.length >= MAX_PHOTOS}
                      onClick={() => galleryInputRef.current?.click()}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[14px] border border-[#1B2142]/18 bg-white px-4 py-2 text-[14px] font-bold text-[#1B2142] disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                      Choose from files
                    </button>
                  </div>

                  <p className="mt-3 text-[12px] text-[#1B2142]/60">
                    JPEG, PNG or WebP. On a phone, Take a photo opens your
                    camera.
                  </p>
                </div>

                {photos.length > 0 ? (
                  <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {photos.map((photo) => (
                      <li key={photo.id} className="flex flex-col gap-1.5">
                        <div className="aspect-[4/3] overflow-hidden rounded-[14px] bg-[#ECEAFE]/60">
                          <img
                            src={photo.previewUrl}
                            alt={photo.file.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 px-0.5">
                          <span className="truncate text-[12px] font-medium text-[#1B2142]/75">
                            {photo.file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(photo.id)}
                            className="shrink-0 text-[12px] font-bold text-[#9A3412] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <p className="mt-3 text-[12px] leading-snug text-[#1B2142]/65">
                  Photos are stored privately and only reviewers can open them.
                  Location data is removed before upload.
                </p>
              </section>

              {/* Step 4: Details */}
              <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_16px_rgba(27,33,66,0.08)] md:p-6">
                <StepHeading step={4} title="Details" />

                <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={whenInputId}
                      className="block text-[13px] font-bold text-[#1B2142]"
                    >
                      When did it happen?
                    </label>
                    <input
                      id={whenInputId}
                      type="datetime-local"
                      value={occurredAt}
                      onChange={(event) => setOccurredAt(event.target.value)}
                      className="mt-1.5 min-h-[44px] w-full rounded-[14px] border border-[#1B2142]/15 bg-white px-3.5 py-2 text-[14px] text-[#1B2142] focus:border-[#1B2142] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={whereInputId}
                      className="block text-[13px] font-bold text-[#1B2142]"
                    >
                      Where?{' '}
                      <span className="font-normal text-[#1B2142]/60">
                        (optional)
                      </span>
                    </label>
                    <input
                      id={whereInputId}
                      type="text"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="For example, canteen queue"
                      className="mt-1.5 min-h-[44px] w-full rounded-[14px] border border-[#1B2142]/15 bg-white px-3.5 py-2 text-[14px] text-[#1B2142] placeholder:text-[#1B2142]/45 focus:border-[#1B2142] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3.5">
                  <label
                    htmlFor={notesInputId}
                    className="block text-[13px] font-bold text-[#1B2142]"
                  >
                    Anything else a reviewer should know?{' '}
                    <span className="font-normal text-[#1B2142]/60">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id={notesInputId}
                    rows={3}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Add any detail that helps the reviewer"
                    className="mt-1.5 w-full resize-y rounded-[14px] border border-[#1B2142]/15 bg-white px-3.5 py-2.5 text-[14px] text-[#1B2142] placeholder:text-[#1B2142]/45 focus:border-[#1B2142] focus:outline-none"
                  />
                </div>
              </section>

              {/* Privacy note */}
              <div className="flex items-center gap-2.5 rounded-[14px] bg-[#ECEAFE]/70 px-4 py-3 text-[13px] text-[#1B2142]/80">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 shrink-0 text-[#1B2142]"
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span>
                  Your name is visible to reviewers only. The student you report
                  will not see who reported them.
                </span>
              </div>

              {formError ? (
                <div
                  role="alert"
                  className="rounded-[14px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] font-bold text-[#991B1B]"
                >
                  {formError}
                </div>
              ) : null}

              {submitted ? (
                <div
                  role="status"
                  className="rounded-[14px] border border-[#BBF7D0] bg-[#DCFCE7] px-4 py-3 text-[13px] font-bold text-[#166534]"
                >
                  Report draft validated ({selectedViolation}, {photos.length}{' '}
                  photo{photos.length === 1 ? '' : 's'}). Connect your submit
                  endpoint to send it to the review queue.
                </div>
              ) : null}

              {/* Form actions */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-[14px] bg-[#FFB020] px-6 text-[15px] font-extrabold text-[#1B2142] shadow-[0_4px_16px_rgba(27,33,66,0.08)] motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142] sm:flex-none"
                >
                  Submit report
                </button>
                <Link
                  to="/report"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-[14px] px-4 text-[14px] font-bold text-[#1B2142] hover:bg-[#1B2142]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
                >
                  Cancel
                </Link>
              </div>
            </form>

            {/* Right Sidebar Column */}
            <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:col-span-4 lg:gap-5">
              {/* What happens next */}
              <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_16px_rgba(27,33,66,0.08)]">
                <h2 className="text-[16px] font-extrabold text-[#1B2142]">
                  What happens next
                </h2>
                <ol className="mt-4 flex flex-col gap-4">
                  {HOW_IT_WORKS.map((item) => (
                    <li key={item.step} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#FDE4B8] text-[12px] font-extrabold text-[#1B2142]"
                      >
                        {item.step}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13px] font-extrabold leading-snug text-[#1B2142]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-[#1B2142]/65">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Your recent reports */}
              <section className="rounded-[22px] bg-white p-5 shadow-[0_4px_16px_rgba(27,33,66,0.08)]">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-[16px] font-extrabold text-[#1B2142]">
                    Your recent reports
                  </h2>
                  <Link
                    to="/reports"
                    className="text-[13px] font-bold text-[#9A3412] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
                  >
                    View all
                  </Link>
                </div>

                <ul className="mt-3 divide-y divide-[#1B2142]/8">
                  {recentReports.slice(0, 3).map((report) => (
                    <li key={report.id}>
                      <Link
                        to={`/reports/${report.id}`}
                        className="flex min-h-[56px] items-center justify-between gap-3 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[14px] font-extrabold text-[#1B2142]">
                            {report.ruleTitle}
                          </span>
                          <span className="block truncate text-[12px] text-[#1B2142]/65">
                            {report.dateLabel} · {report.location}
                          </span>
                        </span>
                        <StatusPill status={report.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
