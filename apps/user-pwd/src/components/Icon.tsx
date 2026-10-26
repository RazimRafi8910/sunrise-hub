import type { ReactNode, SVGProps } from 'react'

export type IconName =
  | 'sunrise'
  | 'bell'
  | 'eye'
  | 'eyeOff'
  | 'plus'
  | 'qrCode'
  | 'utensils'
  | 'pencil'
  | 'shieldAlert'
  | 'calendarDays'
  | 'house'
  | 'wallet'
  | 'slidersHorizontal'
  | 'user'
  | 'mail'
  | 'phone'
  | 'idCard'
  | 'building2'
  | 'shieldCheck'
  | 'logOut'

const glyphs: Record<IconName, ReactNode> = {
  sunrise: (
    <>
      <path d="M6 17a6 6 0 0 1 12 0" />
      <path d="M12 6v2.5M5.2 9.7l1.8 1.8M18.8 9.7l-1.8 1.8M2.5 17h19" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M4 4l16 16" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  qrCode: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 14h2v2h-2zM18 14h2M14 18h2M18 18h2v2" />
    </>
  ),
  utensils: (
    <>
      <path d="M4 3v7a3 3 0 0 0 3 3v8M7 3v7M10 3v7a3 3 0 0 1-3 3" />
      <path d="M18 21V3c-2.5 1.5-4 4.5-4 8h4" />
    </>
  ),
  pencil: <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z" />,
  shieldAlert: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />
      <path d="M12 8v4M12 15.5v.01" />
    </>
  ),
  calendarDays: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </>
  ),
  house: (
    <>
      <path d="M4 11l8-7 8 7v8.5a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19.5z" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" />
      <path d="M4 7.5V17a2 2 0 0 0 2 2h13a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 1 4 7.5z" />
      <circle cx="16" cy="13.5" r="1" />
    </>
  ),
  slidersHorizontal: (
    <>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7.5l8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  idCard: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.5-1.5 1.7-2 3-2s2.5.5 3 2M14.5 10h4M14.5 14h3" />
    </>
  ),
  building2: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M2.5 21h19M9 21v-5h6v5M9 11h.01M15 11h.01" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  logOut: (
    <>
      <path d="M9 4H6.5A2.5 2.5 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20H9" />
      <path d="M16 8l4 4-4 4M20 12H9" />
    </>
  ),
}

type IconProps = {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
} & Omit<SVGProps<SVGSVGElement>, 'name' | 'width' | 'height' | 'children'>

export function Icon({
  name,
  size = 22,
  strokeWidth = 1.8,
  className,
  ...rest
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {glyphs[name]}
    </svg>
  )
}
