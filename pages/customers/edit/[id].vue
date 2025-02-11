<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Редактирование {{ data?.name || '' }}</h1>
    <form @submit="onSubmit" class="flex flex-col gap-2">
      <UiInput 
        placeholder="Наименование"
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        class="input"
      />
      <UiInput 
        placeholder="Email"
        v-model="email"
        v-bind="emailAttrs"
        type="text"
        class="input"
      />
      <UiInput 
        placeholder="Откуда пришел"
        v-model="fromSource"
        v-bind="fromSourceAttrs"
        type="text"
        class="input"
      />
      <img
        v-if="values.avatar_url || isUploadImagePending"
        :src="values.avatar_url"
        alt=""
        width="50"
        height="50"
        class="rounded-full"
      />
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-2">
            Логотип
          </div>
          <UiInput
            type="file"
            :onChange="handleUploadImage"
            :disabled="isUploadImagePending"
            class="bg-secondary"
          />
        </label>
      </div>
      <UiButton
        :disabled="isPending"
        variant="secondary"
        class="w-min"
      >
        {{ isPending ? 'Загрузка...' : 'Сохранить' }}
      </UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { storage } from '@/utils/appwrite'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { v4 as uuid } from 'uuid'
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '@/app.constans'
import type { Customer } from '@/types/deals.types'

interface CustomerFormState extends Pick<Customer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}

useSeoMeta({
  title: 'Редактирование компании'
})

const route = useRoute()
const customerId = route.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<CustomerFormState>()

const { data, isSuccess } = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
})

watch(isSuccess, () => {
  const initialData = data.value as unknown as CustomerFormState
  setValues({
    email: initialData.email,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source || '',
    name: initialData.name,
  })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromSource, fromSourceAttrs] = defineField('from_source')

const { mutate, isPending } = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (data: CustomerFormState) => DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
})

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ['update customer image'],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
  onSuccess: (data) => {
    const response = storage.getFileDownload(STORAGE_ID, data.$id)
    setFieldValue('avatar_url', response)
  }
})

function handleUploadImage(e: Event) {
  const target= e?.target as HTMLInputElement
  target.files?.length && uploadImage(target.files[0])
}

const onSubmit = handleSubmit(values => mutate(values))
</script>