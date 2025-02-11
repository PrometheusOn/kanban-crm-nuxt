import type { Card } from "@/types/kanban.types"

export const useDealSlideStore = defineStore('deal-slide-store', () => {
  const isSlideOpen = ref(false)
  const currentDeal = ref<Card | null>(null)

  function openDealSlide(card: Card) {
    currentDeal.value = {...card}
    toogleSlideState(true)
  }

  function toogleSlideState(state?: boolean) {
    const currentState = state ?? isSlideOpen.value
    isSlideOpen.value = currentState
  
    if (currentState === false) {
      currentDeal.value = null
    }
  }

  return {
    currentDeal,
    isSlideOpen,
    openDealSlide,
    toogleSlideState,
  }
})