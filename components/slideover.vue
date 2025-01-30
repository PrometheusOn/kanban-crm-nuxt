<template>
  <UiDrawer>
    <UiDrawerContent>
      <UiDrawerHeader>
        <UiDrawerTitle>О СДЕЛКЕ</UiDrawerTitle>
        <UiDrawerDescription>
          <div v-for="(field, index) in props" :key="index">
            
          </div>
        </UiDrawerDescription>
      </UiDrawerHeader>
      <!-- <UiDrawerFooter></UiDrawerFooter> Блок с комментарием -->
    </UiDrawerContent>
  </UiDrawer>
</template>

<script setup lang="ts">
import type { Card } from "@/types/kanban.types";

const props = defineProps<Card>()


</script>

<style scoped>

</style>