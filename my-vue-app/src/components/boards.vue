<script setup lang="ts">
import { ref } from 'vue';
import { get_user_boards, create_board } from '../generated';
import { authStore } from '../auth_store';
import type router from '../router';

type Board = {
    id: number;
    title: string;
}

const boards = ref<{[key: number]: Board}>({})
get_user_boards(1).then((data) => boards.value = data)

const showForm = ref(false)

async function handleCreateBoard(e: Event) {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const title = formData.get('title') as string
  if (!title) return
  const res = await create_board(title, 1)
  const board = (res as any).board
  if (board?.id) {
    window.location.href = `/board/${board.id}/`
  }
}
</script>

<template>
  <div class="page">
    <div class="page__header">
      <h1 class="page__title">Your Boards</h1>
      <p class="page__subtitle">Select a board to view its lists and tasks</p>
    </div>
    <div class="boards-grid">
      <router-link
        v-for="(board, index) in Object.values(boards)"
        :key="board.id"
        :to="authStore?.user?.id ? `/board/${board.id}` : '/sign-in'"
        class="board-card"
        :style="{ animationDelay: `${index * 60}ms` }"
        @click="function(){if (!authStore?.user?.id) {authStore.redirectAfterLogin = `/board/${board.id}`}}"
      >
        <div class="board-card__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
        <h2 class="board-card__title">{{ board.title }}</h2>
        <div class="board-card__footer">
          <template v-if="authStore?.user?.id">
            <span>Board</span>
            <span class="board-card__arrow">&rarr;</span>
          </template>
          <template v-else>
            <span>Sign in to access</span>
          </template>
        </div>
      </router-link>

      <!-- Create new board -->
      <div
        v-if="!showForm"
        class="board-card board-card--new"
        @click="showForm = true"
        style="cursor: default;"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        <span>Create new board</span>
      </div>

      <div v-else class="board-card" style="cursor: default;">
        <form class="create-board-form" @submit="handleCreateBoard">
          <input type="text" name="title" placeholder="Board name..." autofocus />
          <div style="display: flex; gap: 0.375rem;">
            <button type="submit" class="btn-primary">Create</button>
            <button type="button" class="btn-ghost" @click="showForm = false">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

