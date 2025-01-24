export const useLoadingStore = defineStore('loading-store', () => {
  const isLoading = ref(false)

  function changeLoadingStatus() {
    isLoading.value = !isLoading.value 
  }

  return {
    isLoading,
    changeLoadingStatus,
  }
})