<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import UseChannelHook from '../ChannelHook'
import List from './List.vue';
import { useRoute } from 'vue-router';
import { create_list } from '../generated';

type ListT = {
    id: number;
    title: string;
}

const boardId = parseInt(useRoute().params.boardId as string)
console.assert(!isNaN(boardId), 'boardId is not a number')

const [lists, ws] = UseChannelHook<ListT>(`ws://localhost:8080/board/${boardId}`)

onUnmounted(() => {
    ws.close();
})

const showAddList = ref(false)

function handleCreateList(e: Event) {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const name = formData.get('name') as string
  if (!name) return
  create_list(name, boardId)
  form.reset()
}
</script>

<template>
  <div class="board-view">
    <div class="board-columns">
      <List
        v-for="list in Object.values(lists)"
        :key="list.id"
        :list_id="list.id"
        :title="list.title"
        :board_id="boardId"
      />

      <!-- Add list trigger / form -->
      <button
        v-if="!showAddList"
        class="add-list-trigger"
        @click="showAddList = true"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add list
      </button>

      <form
        v-else
        class="add-list-form"
        @submit="handleCreateList"
      >
        <input type="text" name="name" placeholder="List name..." autofocus />
        <div style="display: flex; gap: 0.375rem;">
          <button type="submit" class="btn-primary">Add</button>
          <button type="button" class="btn-ghost" @click="showAddList = false">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
