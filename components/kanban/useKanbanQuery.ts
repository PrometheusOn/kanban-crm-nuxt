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
      const newBoars = [...KANBAN_DATA]
      const deals = data.documents as unknown as Deal[]
    }
  })
}