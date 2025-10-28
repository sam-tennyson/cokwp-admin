import { supabase } from '@/services/supabase'
import type { TPurchase, PurchaseCreateInput, PurchaseUpdateInput } from '@/types/purchase'
import { useProfileStore } from '@/store/profile-store'

export async function fetchPurchases(): Promise<TPurchase[]> {
  const { profile, isAdmin } = useProfileStore.getState()
  let query = supabase
    .from('purchases')
    .select(`*, user_id:profiles(id, first_name, last_name, email), course_id:courses(id, title)`) // quizzes table used as course_id
    .order('created_at', { ascending: false })
  if (!isAdmin) {
    query = query.eq('user_id', profile?.id)
  }
  const { data, error } = await query
  if (error) {
    throw new Error(error.message)
  }
  return data as unknown as TPurchase[]
}

export async function fetchPurchaseById(id: string): Promise<TPurchase> {
  const { data, error } = await supabase
    .from('purchases')
    .select(`*, user_id:profiles(id, first_name, last_name, email), course_id:courses(id, title)`) // quizzes table used as course_id
    .eq('id', id)
    .single()
  if (error) {
    throw new Error(error.message)
  }
  return data as unknown as TPurchase
}

export async function createPurchase(input: PurchaseCreateInput): Promise<TPurchase> {
  const payload = { payment_status: 'pending', transaction_id: null, ...input }
  const { data, error } = await supabase
    .from('purchases')
    .insert(payload)
    .select(`*, user_id:profiles(first_name, last_name, email), course_id:courses(title)`) // courses table used as course_id
    .single()
  if (error) {
    throw new Error(error.message)
  }
  return data as unknown as TPurchase
}

export async function updatePurchase(id: string, input: PurchaseUpdateInput): Promise<TPurchase> {
  const { data, error } = await supabase
    .from('purchases')
    .update(input)
    .eq('id', id)
    .select(`*, user_id:profiles(first_name, last_name, email), course_id:courses(title)`) // courses table used as course_id
    .single()
  if (error) {
    throw new Error(error.message)
  }
  return data as unknown as TPurchase
}


