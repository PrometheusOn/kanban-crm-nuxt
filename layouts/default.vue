<template>
  <LayoutLoader v-if="loadingStore.isLoading" />
  <section v-else :class="{'grid grid-cols-[1fr_6fr] min-h-full': authStore.isUserAuth}">
    <LayoutSidebar v-if="authStore.isUserAuth" />
    <div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { account } from '@/utils/appwrite'

const loadingStore = useLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    loadingStore.changeLoadingStatus()
    const user = await account.get()
    if (user) authStore.setUser({
      email: user.email,
      name: user.name,
      status: user.status, 
    })
  } catch (e) {
    router.push('/login')
  } finally {
    loadingStore.changeLoadingStatus()
  }
})

</script>