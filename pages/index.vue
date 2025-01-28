<template>
  <div class="p-10 min-h-screen w-full">
    <h1 class="font-bold text-2ml mb-10">
      CRM System by @ramazanfaizov
    </h1>
    <div>
      <UiCard class="mb-3" draggable="true">
        <UiCardHeader>name card</UiCardHeader>
        <UiCardContent>company</UiCardContent>
        <UiCardFooter>date</UiCardFooter>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card, Column } from "@/components/kanban/kanban.types"
// import { useKanbanQuery } from "@/components/kanban/useKanbanQuery"

useHead({
  title: 'Home'
})

const dragCard = ref<Card | null>(null)
const sourceColumn = ref<Column | null>(null)
// useKanbanQuery()

</script>

<style scoped>

</style>