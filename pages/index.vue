<template>
  <div class="h-full p-10">
    <h1 class="font-bold text-2ml mb-10">
      CRM System by @ramazanfaizov
    </h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
          v-for="(column, index) in data"
          :key="index"
          class="h-full"
          @dragover="handleDragOver"
          @drop="() => handleColumn(column)"
        >
          <div
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>
          <div>
            <KanbanCreateDeal :status="column.id" :refetch="refetch" />
            <UiCard
              v-for="(card, index) in column.items"
              class="mb-5"
              draggable="true"
              :key="index"
              @dragstart="handleDragStart(card, column)"
              @click="dealSlideStore.openDealSlide(card)"
            >
              <UiCardHeader>
                <UiCardTitle>{{ card.name }}</UiCardTitle>
                <UiCardDescription class="mt-2">
                  {{ convertCurrency(card.price) }}
                </UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="text-xs">
                <div>Компания</div>
                {{ card.companyName }}
              </UiCardContent>
              <UiCardFooter>{{ $dayjs(card.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>
    </div>
    <Slideover
      :open="isSlideOpen"
      direction="right"
      :isDragging="false"
      @close="dealSlideStore.closeDealSlide"
    />
  </div>
</template>

<script setup lang="ts">
import type { Card, Column } from "@/types/kanban.types"
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery"
import { convertCurrency } from '@/utils/convertCurrency'
import { EnumStatus } from "@/types/deals.types"
import { COLLECTION_DEALS, DB_ID } from "@/app.constans"
import { generateColumnStyle } from '@/utils/generate-gradient'

useHead({
  title: 'Home'
})

const dealSlideStore = useDealSlideStore()
const { isSlideOpen } = storeToRefs(dealSlideStore)
const dragCard = ref<Card | null>(null)
const sourceColumn = ref<Column | null>(null)
const { data, isLoading, refetch } = useKanbanQuery()

type TypeMutationVariables = {
  docId: string
  status?: EnumStatus
}

const { mutate } = useMutation({
  mutationKey: ['move card'],
  mutationFn: ({ docId, status }: TypeMutationVariables) => DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status }),
  onSuccess: () => refetch()
})

function handleDragStart(card: Card, column: Column) {
  dragCard.value = card
  sourceColumn.value = column
}

function handleDragOver(event: DragEvent) {
  event?.preventDefault()
}

function handleColumn(column: Column) {
  if (dragCard.value && sourceColumn.value) {
    mutate({
      docId: dragCard.value.id,
      status: column.id
    })
  }
}
</script>
