import { useEffect, useState } from 'react'
import type { TPurchase } from '@/types/purchase'
import { fetchPurchases } from '@/services/purchases'
import PurchaseList from '@/components/purchases/purchase-list'
import { showErrorToast } from '@/lib/toast-util'
import { supabase } from '@/services/supabase'
import { useProfileStore } from '@/store/profile-store'

export default function PurchaseManagement() {
  useProfileStore()
  const [purchases, setPurchases] = useState<TPurchase[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function loadPurchases() {
    try {
      setIsLoading(true)
      const data = await fetchPurchases()
      setPurchases(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load purchases'
      showErrorToast(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPurchases()
    const channel = supabase
      .channel('purchases-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'purchases' }, (payload) => {
        setPurchases((prev) => {
          if (payload.eventType === 'INSERT') {
            return [payload.new as TPurchase, ...prev]
          }
          if (payload.eventType === 'UPDATE') {
            return prev.map((p) => (p.id === (payload.new as TPurchase).id ? (payload.new as TPurchase) : p))
          }
          if (payload.eventType === 'DELETE') {
            return prev.filter((p) => p.id !== (payload.old as TPurchase).id)
          }
          return prev
        })
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Purchases</h1>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
        {/* {JSON.stringify({purchases})} */}
        <PurchaseList purchases={purchases} />
        </>
      )}
    </div>
  )
}


