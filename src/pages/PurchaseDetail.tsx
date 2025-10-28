import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { TPurchase } from '@/types/purchase'
import { fetchPurchaseById } from '@/services/purchases'
import { showErrorToast } from '@/lib/toast-util'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PaymentStatusBadge } from '@/components/purchases/payment-status'

export default function PurchaseDetail() {
  const { id = '' } = useParams()
  const [purchase, setPurchase] = useState<TPurchase | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function load() {
    try {
      setIsLoading(true)
      const data = await fetchPurchaseById(id)
      setPurchase(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load purchase'
      showErrorToast(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) load()
  }, [id])

  if (isLoading || !purchase) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Purchase Detail</h1>
        <Button asChild variant="secondary"><Link to="/purchases">Back</Link></Button>
      </div>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailRow label="ID" value={purchase.id} />
            <DetailRow label="Status" value={<PaymentStatusBadge status={purchase.payment_status} />} />
            <DetailRow label="Amount" value={`₹${purchase.amount.toFixed(2)}`} />
            <DetailRow label="Transaction ID" value={purchase.transaction_id || '-'} />
            <DetailRow label="User" value={`${purchase.user_id.first_name} ${purchase.user_id.last_name}`} />
            <DetailRow label="Course" value={purchase.course_id.title} />
            <DetailRow label="Created At" value={purchase.created_at ? new Date(purchase.created_at).toLocaleString() : '-'} />
            <DetailRow label="Updated At" value={purchase.updated_at ? new Date(purchase.updated_at).toLocaleString() : '-'} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DetailRow({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  )
}


