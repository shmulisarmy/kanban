<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import UseChannelHook from '../ChannelHook'
import InlineEdit from './InlineEdit.vue'
import { WS_BASE_URL } from '../settings'
import {
  create_task,
  delete_task,
  remove_list,
  change_list_title,
  change_task_title,
  change_task_list,
} from '../generated'

type Task = {
    id: number;
    title: string;
    description: string;
}

const props = defineProps<{
    list_id: number;
    title?: string;
    board_id: number;
}>()

const [tasks, ws] = UseChannelHook<Task>(`${WS_BASE_URL}/list/${props.list_id}`)

onUnmounted(() => {
    ws.close();
})

const showAddTask = ref(false)
const isDragOver = ref(false)

function handleCreateTask(e: Event) {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const name = formData.get('name') as string
  if (!name) return
  create_task(props.list_id, name)
  form.reset()
}

// --- Drag and drop ---

// Module-level drag state shared across all List instances
declare global {
  interface Window {
    __kanban_dragging?: { id: number; list_id: number } | null;
  }
}

function onTaskDragStart(taskId: number) {
  window.__kanban_dragging = { id: taskId, list_id: props.list_id }
}

function onTaskDragEnd() {
  window.__kanban_dragging = null
}

function onColumnDragOver(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = true
}

function onColumnDragLeave() {
  isDragOver.value = false
}

function onColumnDrop(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = false
  const dragging = window.__kanban_dragging
  if (!dragging) return
  if (dragging.list_id !== props.list_id) {
    change_task_list(dragging.id, dragging.list_id, props.list_id)
  }
  window.__kanban_dragging = null
}
</script>

<template>
  <div
    class="column"
    :class="{ 'column--drag-over': isDragOver }"
    @dragover="onColumnDragOver"
    @dragleave="onColumnDragLeave"
    @drop="onColumnDrop"
  >
    <!-- Header -->
    <div class="column__header">
      <div class="column__header-left">
        <InlineEdit
          :text="title ?? `List ${list_id}`"
          @change="(val: string) => change_list_title(list_id, val)"
        />
        <span class="column__count">{{ Object.keys(tasks).length }}</span>
      </div>
      <div class="column__actions">
        <button
          class="btn-danger btn-icon"
          @click="remove_list(board_id, list_id)"
          title="Delete list"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Body — task cards -->
    <div class="column__body">
      <div
        v-for="(task, index) in Object.values(tasks)"
        :key="task.id"
        class="task-card"
        draggable="true"
        :style="{ animationDelay: `${index * 60}ms` }"
        @dragstart="onTaskDragStart(task.id)"
        @dragend="onTaskDragEnd"
      >
        <span class="task-card__handle">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="6" r="2"/><circle cx="15" cy="6" r="2"/>
            <circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/>
            <circle cx="9" cy="18" r="2"/><circle cx="15" cy="18" r="2"/>
          </svg>
        </span>
        <div class="task-card__body">
          <InlineEdit
            :text="task.title"
            @change="(val: string) => change_task_title(task.id, val)"
          />
          <p v-if="task.description">{{ task.description }}</p>
        </div>
        <button
          class="btn-danger btn-icon task-card__delete"
          @click="delete_task(list_id, task.id)"
          title="Delete task"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div v-if="Object.keys(tasks).length === 0" class="empty-state" style="padding: 1.5rem 1rem;">
        <p class="empty-state__text">No tasks yet</p>
      </div>
    </div>

    <!-- Footer — add task -->
    <div class="column__footer">
      <button
        v-if="!showAddTask"
        class="add-task-trigger"
        @click="showAddTask = true"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add task
      </button>

      <form
        v-else
        class="add-task-form"
        @submit="handleCreateTask"
      >
        <input type="text" name="name" placeholder="Task name..." autofocus />
        <div class="add-task-form__actions">
          <button type="submit" class="btn-primary">Add</button>
          <button type="button" class="btn-ghost" @click="showAddTask = false">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>import type { WS_BASE_URL } from '../settings'
import type { WS_BASE_URL } from '../settings'

