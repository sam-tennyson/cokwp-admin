import type { TPurchase } from '@/types/purchase'
import { BadgeCheck, Loader2, RotateCcw, XCircle } from 'lucide-react'

type PaymentStatusBadgeProps = {
  status: TPurchase['payment_status']
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const map: Record<
    TPurchase['payment_status'],
    { className: string; icon: React.ReactNode; label: string }
  > = {
    success: {
      className: 'bg-green-40 text-green-700 border-green-300',
      icon: <BadgeCheck className="h-3.5 w-3.5" />,
      label: 'Success',
    },
    pending: {
      className: 'bg-yellow-40 text-yellow-700 border-yellow-300',
      icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
      label: 'Pending',
    },
    failed: {
      className: 'bg-red-40 text-red-700 border-red-300',
      icon: <XCircle className="h-3.5 w-3.5" />,
      label: 'Failed',
    },
    cancelled: {
      className: 'bg-red-40 text-red-700 border-red-300',
      icon: <XCircle className="h-3.5 w-3.5" />,
      label: 'Cancelled',
    },
    refunded: {
      className: 'bg-blue-40 text-blue-700 border-blue-300',
      icon: <RotateCcw className="h-3.5 w-3.5" />,
      label: 'Refunded',
    },
  }

  const cfg = map[status]

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${cfg.className}`}>
      {cfg.icon}
      <span>{cfg.label}</span>
    </span>
  )
}


