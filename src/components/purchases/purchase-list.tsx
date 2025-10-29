import type { TPurchase } from '@/types/purchase'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { ResponsiveTable, type ColumnDef } from '../responsive-table'
import { MoreHorizontal } from 'lucide-react'
import { ActionMenu } from '../action-menu'
import { PaymentStatusBadge } from './payment-status'

type PurchaseListProps = {
  purchases: readonly TPurchase[]
}

// status badge handled by PaymentStatusBadge

export default function PurchaseList({ purchases }: PurchaseListProps) {
  const navigate = useNavigate()
  console.log({ purchases })
  const columns: readonly ColumnDef<TPurchase>[] = [
    {
      id: 'id',
      header: 'ID',
      className: 'min-w-[60px]',
      cell: (row) => <Link to={`/purchases/${row.id}`} className="text-xs font-medium text-left hover:underline">{row.id}</Link>,
      cardLabel: 'ID',
      cardOrder: 1,
    },
    {
      id: 'course',
      header: 'Course',
      cell: (row) => <span>{row.course_id.title}</span>,
      cardLabel: 'Course',
      cardOrder: 2,
    },
    {
      id: 'user',
      header: 'User',
      cell: (row) => <span>{`${row.user_id.first_name} ${row.user_id.last_name}`}</span>,
      cardLabel: 'User',
      cardOrder: 3,
    },
    {
      id: 'email',
      header: 'Email',
      cell: (row) => <span>{row.user_id.email}</span>,
      cardLabel: 'Email',
      cardOrder: 4,
    },
    {
      id: 'amount',
      header: 'Amount',
      cell: (row) => <span> &#8377;{row.amount.toFixed(2)}</span>,
      cardLabel: 'Amount',
      cardOrder: 5,
    },
    {
      id: 'payment_status',
      header: 'Status',
      cell: (row) => <PaymentStatusBadge status={row.payment_status} />,
      cardLabel: 'Status',
      cardOrder: 5,
    },
    
    {
      id: 'payment_mode',
      header: 'Payment Mode',
      cell: (row) => <span>{row.payment_mode === 'TEST' ? 'Test' : 'Live'}</span>,
      cardLabel: 'Payment Mode',
      cardOrder: 6,
    },
    {
      id: 'created_at',
      header: 'Created At',
      cell: (row) => <span>{row.created_at ? new Date(row.created_at).toLocaleString() : '-'}</span>,
      cardLabel: 'Created At',
      cardOrder: 6,
    },
    {
      id: 'updated_at',
      header: 'Updated At',
      cell: (row) => <span>{row.updated_at ? new Date(row.updated_at).toLocaleString() : '-'}</span>,
      cardLabel: 'Updated At',
      cardOrder: 7,
    }
  ]

  function RowActions({ purchase }: { purchase: TPurchase }) {

    return (
      <div className="flex items-center gap-2">
        <ActionMenu
          trigger={
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-gray-100">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </Button>
          }
          items={[
            {
              id: 'view',
              label: 'View Details',
              onSelect: () => navigate(`/purchases/${purchase.id}`),
            },
          ]}
        />
      </div>
    )
  }

  return (
    <div className="space-y-2 w-full">
      <ResponsiveTable
        data={purchases}
        columns={columns}
        rowKey={(row) => row.id}
        renderCardTitle={(row) => (
          <Link to={`/purchases/${row.id}`} className="text-base font-semibold text-foreground hover:text-primary cursor-pointer text-left truncate w-full transition-colors">
            {row.course_id.title}
          </Link>
        )}
        onCardTitleClick={(row) => navigate(`/purchases/${row.id}`)}
        renderRowEndActions={(row) => <RowActions purchase={row} />}
      />
    </div>
  )
}


