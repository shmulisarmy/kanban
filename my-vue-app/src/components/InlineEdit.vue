<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  text: string;
}>()

const emit = defineEmits<{
  change: [value: string];
}>()

const editing = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

async function startEdit() {
  editing.value = true
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    const value = (e.target as HTMLInputElement).value
    if (value) {
      emit('change', value)
    }
    editing.value = false
  } else if (e.key === 'Escape') {
    editing.value = false
  }
}

function handleBlur() {
  editing.value = false
}
</script>

<template>
  <div class="inline-edit">
    <template v-if="!editing">
      <span class="inline-edit__text" @click="startEdit">{{ text }}</span>
      <span class="inline-edit__icon" @click="startEdit">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
          <path d="m15 5 4 4"/>
        </svg>
      </span>
    </template>
    <input
      v-else
      ref="inputRef"
      type="text"
      class="inline-edit__input"
      :value="text"
      @keydown="handleKeydown"
      @blur="handleBlur"
    />
  </div>
</template>
