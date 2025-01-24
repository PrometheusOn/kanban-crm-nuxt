<template>
  <aside class="px-5 py-8 bg-sidebar h-full w-full relative">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg src="/logo.svg" alt="" width="120px" class="mx-auto" />
    </NuxtLink>
    <button
      class="absolute top-2 right-3 transition-colors hover:text-primary"
      @click="logout">
      <Icon name="line-md:logout" size="20" />
    </button>
    <LayoutMenu />
  </aside>
</template>

<script setup lang="ts">
const loadingStore = useLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

async function logout() {
  loadingStore.changeLoadingStatus()
  try {
    await authStore.logout()
    await router.push('/login')    
  } finally {
    loadingStore.changeLoadingStatus()
  }

}
</script>

<style lang="scss" scoped>

</style>