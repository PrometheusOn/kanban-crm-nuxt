<template>
  <div class="p-10">
    <h1 class="font-bold text-2ml mb-10">
      CRM System by @ramazanfaizov
    </h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
          v-for="(column, index) in data"
          :key="index"
        >
          <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
            {{ column.name }}
          </div>
          <div>
            <KanbanCreateDeal :status="column.id" :refetch="refetch" />
            <UiCard
              v-for="(item, index) in column.items"
              class="mb-3"
              draggable="true"
              :key="index"
            >
              <UiCardHeader>
                <UiCardTitle>{{ item.name }}</UiCardTitle>
                <UiCardDescription class="mt-2">
                  {{ convertCurrency(item.price) }}
                </UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="text-xs">{{ item.companyName }}</UiCardContent>
              <UiCardFooter>{{ $dayjs(item.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
            </UiCard>            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card, Column } from "@/types/kanban.types"
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery"
import { convertCurrency } from '@/utils/convertCurrency'

useHead({
  title: 'Home'
})

const dragCard = ref<Card | null>(null)
const sourceColumn = ref<Column | null>(null)
const { data, isLoading, refetch } = useKanbanQuery()


</script>
