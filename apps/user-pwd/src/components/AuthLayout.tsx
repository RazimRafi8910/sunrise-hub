import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Card } from './Card'
import { Icon } from './Icon'

export type AuthLayoutProps = {
  subtitle: string
  cardTitle: string
  children: ReactNode
  bottomText: string
  bottomLinkText: string
  bottomLinkTo: string
}

export function AuthLayout({
  subtitle,
  cardTitle,
  children,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
}: AuthLayoutProps) {
  return (
    <div className="relative mx-auto flex min-h-dvh max-w-[430px] flex-col justify-between bg-bg px-5 font-sans text-ink">
      <div className="flex flex-col">
        {/* Brand block, centered at top (pt-12) */}
        <header className="flex flex-col items-center pt-12">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-amber">
            <Icon name="sunrise" size={34} strokeWidth={1.9} className="text-ink" />
          </div>
          <h1 className="mt-4 text-[24px] font-extrabold tracking-[-0.01em] text-ink">
            Sunrise Hub
          </h1>
          <p className="mt-1 text-[14px] text-muted">{subtitle}</p>
        </header>

        {/* Form card below the brand block (mt-8) */}
        <Card className="mt-8 flex flex-col gap-4 p-5">
          <h2 className="text-[18px] font-extrabold text-ink">{cardTitle}</h2>
          {children}
        </Card>
      </div>

      {/* Centered text link row below the card */}
      <footer className="my-6 text-center text-[14px] text-muted">
        <span>{bottomText} </span>
        <Link to={bottomLinkTo} className="font-extrabold text-ink hover:underline">
          {bottomLinkText}
        </Link>
      </footer>
    </div>
  )
}
