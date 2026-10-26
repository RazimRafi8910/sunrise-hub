import type { ReactNode } from 'react'
import { Card } from '../../components/Card'

export function InfoCard({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <Card className="flex flex-col px-5 pt-[18px] pb-2">
      <div className={action ? 'flex items-center justify-between' : 'pb-1.5'}>
        <h2 className="text-[18px] font-extrabold tracking-[-0.01em]">{title}</h2>
        {action}
      </div>
      {children}
    </Card>
  )
}
