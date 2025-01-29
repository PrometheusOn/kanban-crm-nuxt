import type { Deal } from './deals.types'

export interface DealFormState extends Pick<Deal, 'name' | 'price'> {
  customer: {
    email: string
    name: string    
  },
  status: string
}