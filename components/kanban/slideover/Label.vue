<template>
  <div class="flex flex-col gap-0.5">
    <label v-if="props.labelText" class="opacity-75 block text-xs">
      {{ defineFieldName(props.labelText) }}
    </label>
    <div class="text-base">
      <UiBadge v-if="labelText === 'status'" variant="outline"><slot/></UiBadge>
      <slot v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from "@/types/kanban.types";

const props = defineProps<{
  labelText: keyof Card
}>()

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
</script>