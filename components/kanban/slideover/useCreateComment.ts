import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from 'uuid'
import { COLLECTION_COMMENTS, COLLECTION_DEALS, DB_ID } from "@/app.constans";

export function useCreateComment({refetch}: {refetch: () => void}) {
  const store = useDealSlideStore()
  const comment = ref('')

  const { mutate } = useMutation({
    mutationKey: ['create a new comments', comment.value],
    mutationFn: () => DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
      text: comment.value,
      deal: store.currentDeal?.id,
    }),
    onSuccess: () => {
      refetch()
      comment.value = ''
    }
  })

  const writeComment = () => {
    comment.value && mutate()
  }

  return {
    comment,
    writeComment,
  }
}