import { COLLECTION_DEALS, DB_ID } from "@/app.constans";
import { useQuery } from "@tanstack/vue-query";
import { KANBAN_DATA } from "./kanban.data";
import type { Card } from "./kanban.types";
import type { Deal } from "@/types/deals.types";

export function useKanbanQuery() {
  return useQuery({
    queryKey: ['deals'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select(data) {
      const newBoard = [...KANBAN_DATA]
      const deals = data.documents as unknown as Deal[]

      deals.forEach(deal => {
        const column = newBoard.find(col => col.id === deal.status)

        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            companyName: deal.customer.name,
            name: deal.name,
            price: deal.price,
            status: deal.status,
          })
        }
      })

      return newBoard
    }
  })
}