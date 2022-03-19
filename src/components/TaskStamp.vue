<template>
  <div class="flex flex-row">
    <div v-if="tasksCompleted < 18" class="flex-1">
      Task #{{ tasksCompleted + 1 }}: {{ tasks[tasksCompleted]?.description }}
    </div>
    <div v-else class="flex-1">All Tasks Completed!</div>
    <UpDownButtons
      :down-icon="faUndo"
      :up-icon="faCheckCircle"
      :show-decrement="tasksCompleted > 0"
      :show-increment="tasksCompleted < 18"
      :class="{ 'text-gray-200': tasksCompleted >= 18 }"
      title="Tasks Completed"
      @increment="$emit('taskComplete')"
      @decrement="$emit('taskUndo')"
    />
  </div>
</template>
<script setup lang="ts">
import { faCheckCircle, faUndo } from "@fortawesome/free-solid-svg-icons";
import { MercTask } from "../models/mercenary";
import UpDownButtons from "./UpDownButtons.vue";

defineProps({
  tasksCompleted: {
    type: Number,
    required: true,
  },
  tasks: {
    type: Array as () => MercTask[],
    required: true,
  },
});
defineEmits<{ (event: "taskComplete"): void; (event: "taskUndo"): void }>();
</script>
