import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "@/app.constans";

export function useCommentsByDeal() {
  const store = useDealSlideStore()

  const dealId = store.currentDeal?.id || ''

  return useQuery({
    queryKey: ['deal', dealId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, dealId),
  })
}