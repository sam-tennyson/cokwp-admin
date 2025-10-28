import { TProfile } from "./profile"

export type TUser =  Pick<TProfile, 'id' | 'first_name' | 'last_name' | 'email'>

export type TCourse = {
    id: string
    title: string
}

export type TPurchase = {
    id: string
    created_at?: string
    user_id: TUser
    course_id: TCourse
    payment_status: 'pending' | 'success' | 'failed' | 'refunded' | 'cancelled'
    transaction_id: string | null
    amount: number
    updated_at?: string | null,
    payment_mode: 'TEST' | 'LIVE'
}

export type PurchaseCreateInput = {
    user_id: string
    course_id: string
    amount: number
    payment_status?: 'pending' | 'success' | 'failed' | 'refunded' | 'cancelled'
    transaction_id?: string | null
}

export type PurchaseUpdateInput = {
    payment_status?: 'pending' | 'success' | 'failed' | 'refunded' | 'cancelled'
    transaction_id?: string | null
}


