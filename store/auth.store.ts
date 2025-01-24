import type { LoginForm, UserAuthInfo } from "@/types/auth";
import { v4 as uuid } from 'uuid'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserAuthInfo>({
    email: '',
    name: '',
    status: false,
  })

  const isUserAuth = computed(() => user.value.status)

  function clearUser() {
    user.value = {
      email: '',
      name: '',
      status: false,
    }
  }

  function setUser(data: UserAuthInfo) {
    user.value = data
  }

  async function login(form: LoginForm) {
    await account.createEmailPasswordSession(form.email, form.password)
    const response = await account.get()
    if (response) {
      setUser({
        email: response.email,
        name: response.name,
        status: response.status,
      })
    }
  }

  async function register(form: LoginForm) {
      await account.create(
        uuid(),
        form.email,
        form.password,
        form.name
      )
  }

  async function logout() {
    await account.deleteSession('current')
    clearUser()
  }

  return {
    user,
    isUserAuth,
    clearUser,
    setUser,
    login,
    register,
    logout,
  }
})