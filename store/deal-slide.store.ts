import type { Card } from "@/types/kanban.types"

export const useDealSlideStore = defineStore('deal-slide-store', () => {
  const isSlideOpen = ref(false)
  const currentDeal = ref<Card | null>(null)

  function openDealSlide(card: Card) {
    currentDeal.value = {...card}
    toogleSlideState(true)
  }

  function closeDealSlide() {
    toogleSlideState(false)
    currentDeal.value = null
  }

  function toogleSlideState(state?: boolean) {
    isSlideOpen.value = state ?? !isSlideOpen.value
  }

  return {
    currentDeal,
    isSlideOpen,
    openDealSlide,
    closeDealSlide,
    toogleSlideState,
  }
})