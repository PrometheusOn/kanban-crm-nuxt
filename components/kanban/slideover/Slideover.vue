<template>
  <UiDrawer>
    <UiDrawerContent>
      <UiDrawerHeader class="m-4 rounded-sm bg-slate-900 h-[500px]">
        <UiDrawerTitle>О СДЕЛКЕ</UiDrawerTitle>
        <UiDrawerDescription class="grid grid-cols-[1fr_2fr] gap-2 h-full w-full">
          <div class="flex flex-col gap-2">
            <KanbanSlideoverLabel
              v-for="(value, key) in currentDeal" 
              class="w-full"
              :key="key"
              :labelText="key"
            >
              {{ formatFieldValue(key, value) }}
            </KanbanSlideoverLabel>            
          </div>
          <KanbanSlideoverComments />
        </UiDrawerDescription>
      </UiDrawerHeader>
    </UiDrawerContent>
  </UiDrawer>
</template>

<script setup lang="ts">
import { EnumStatus } from "@/types/deals.types";
import type { Card } from "@/types/kanban.types";

// const props = defineProps<Card>()
const dayjs = useDayjs()
const dealSlideStore = useDealSlideStore()
const { currentDeal } = storeToRefs(dealSlideStore)

function defineStatus(key: EnumStatus) {
  const statuses = {
    'todo': 'Входящий',
    'to-be-agreed': 'На согласовании',
    'in-progress': 'В производстве',
    'produced': 'Произведено',
    'done': 'К отгрузке',
  }

  return statuses[key]
}

function formatFieldValue(key: keyof Card, value: string) {
  if (key === "$createdAt") return dayjs(value).format('DD MMMM YYYY')
  else if (key === "status") return defineStatus(value as EnumStatus)
  else return value
}
</script>

<style scoped>

</style>