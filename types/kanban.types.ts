import type { EnumStatus } from '@/types/deals.types'

export interface Card {
	id: string
	name: string
	price: string
	$createdAt: string
	companyName: string
	status: string
}

export interface Column {
	id: EnumStatus
	name: string
	items: Card[]
}
