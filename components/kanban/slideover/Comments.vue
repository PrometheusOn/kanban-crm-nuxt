<template>
  <div class="flex flex-col gap-2 w-full">
    <UiInput
      v-model="comment"
      placeholder="Оставьте комментарий"
      @keyup.enter="writeComment"
    />
    <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded" />
    <UiScrollArea v-else-if="deal" class="flex flex-col h-4/5">
      <div
        v-for="comment in deal?.comments"
        :key="comment.$id"
        class="flex items-start gap-2 mb-2"
      >
        <Icon name="radix-icons:chat-bubble" size="20" />
        <div class="border-border bg-black/20 rounded p-3 w-full">
          <div class="text-sm">
            Комментарий {{ $dayjs(comment.$createdAt).format('HH:mm') }}
            <p>{{ comment.text }}</p>
          </div>          
        </div>
      </div>
    </UiScrollArea>    
  </div>
</template>

<script setup lang="ts">
import type { Deal } from '@/types/deals.types'
import { useCreateComment } from './useCreateComment'
import { useCommentsByDeal } from './useCommentsByDeal'

const { data, refetch, isLoading } = useCommentsByDeal()
const { comment, writeComment } = useCreateComment({refetch})

const deal = data as unknown as Deal
</script>