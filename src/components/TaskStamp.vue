<template>
  <div class="flex flex-row justify-center gap-4">
    <div>Task #{{ tasksCompleted + 1 }}</div>
    <UpDownButtons
      down-icon="undo"
      up-icon="check-circle"
      :show-decrement="tasksCompleted > 0"
      :show-increment="tasksCompleted < 18"
      @increment="$emit('taskComplete')"
      @decrement="$emit('taskUndo')"
    />
  </div>
</template>
<script setup lang="ts">
import UpDownButtons from "./UpDownButtons.vue";

defineProps({
  tasksCompleted: {
    type: Number,
    required: true,
  },
});
defineEmits<{ (event: "taskComplete"): void; (event: "taskUndo"): void }>();
</script>
