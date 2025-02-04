<template>
  <UiDrawer>
    <UiDrawerContent>
      <UiDrawerHeader class="m-4 rounded-sm bg-slate-900">
        <UiDrawerTitle>О СДЕЛКЕ</UiDrawerTitle>
        <UiDrawerDescription>
          <div
            v-for="(value, key) in currentDeal"
            class="flex flex-col gap-0.5"
            :key="key"
          >
            <div class="text-slate-500">{{ defineFieldName(key) }}:</div>
            <div>{{ formatFieldValue(key, value) }}</div>
          </div>
        </UiDrawerDescription>
      </UiDrawerHeader>
      <!-- <UiDrawerFooter></UiDrawerFooter> Блок с комментарием -->
    </UiDrawerContent>
  </UiDrawer>
</template>

<script setup lang="ts">
import type { Card } from "@/types/kanban.types";

// const props = defineProps<Card>()
const dayjs = useDayjs()
const dealSlideStore = useDealSlideStore()
const { currentDeal } = storeToRefs(dealSlideStore)

function defineFieldName(key: keyof Card) {
  const fieldNames = {
    id: 'ID сделки',
    name: 'Наименование',
    price: 'Сумма',
    status: 'Статус',
    companyName: 'Клиент',
    $createdAt: 'Дата создания',
  }
  return fieldNames[key]
}

function formatFieldValue(key: keyof Card, value: string) {
  return key === "$createdAt" ? dayjs(value).format('DD MMMM YYYY') : value
}
</script>

<style scoped>

</style>