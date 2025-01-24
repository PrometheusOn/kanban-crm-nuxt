<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form class="flex flex-col gap-3">
        <UiInput v-model="form.name" placeholder="Name" />
        <UiInput v-model="form.email" placeholder="Email" type="email" />
        <UiInput v-model="form.password" placeholder="Password" type="password" />
        <div class="flex item-center justify-center gap-5">
          <UiButton type="button" @click="login">Login</UiButton>
          <UiButton type="button" @click="register">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginForm } from '@/types/auth'

useHead({
  title: 'Login',
})

const loadingStore = useLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const form = ref<LoginForm>({
  email: '',
  password: '',
  name: '',
})

function clearForm() {
  form.value = {
    email: '',
    password: '',
    name: '',
  }
}

async function login() {
  loadingStore.changeLoadingStatus()
  try {
    await authStore.login(form.value)
    clearForm()
    await router.push('/')
  } catch (e) {
    console.log(e)
  } finally {
    loadingStore.changeLoadingStatus()
  }
}

async function register() {
  loadingStore.changeLoadingStatus()

  try {
    await authStore.register(form.value)
    await authStore.login(form.value)
  } catch (e) {
    console.log(e)
  } finally {
    loadingStore.changeLoadingStatus()
  }
}
</script>