<template>
  <div class="p-1">
    <div v-if="tasksCompleted > 0">
      <div class="text-lg font-bold text-center">
        Task #{{ tasksCompleted }} Completed:<br />
        {{ tasks[tasksCompleted - 1].name }}
      </div>
      <div>
        {{ tasks[tasksCompleted - 1].description }}
      </div>
      <blockquote class="px-2 border-l-2 text-sm">
        {{ tasks[tasksCompleted - 1].quote }}
      </blockquote>
    </div>
    <div class="flex mt-2 pt-2 border-t-2">
      <div v-if="tasksCompleted < 18" class="flex-1">
        <div class="text-lg font-bold">
          Task #{{ tasksCompleted + 1 }}: {{ tasks[tasksCompleted].name }}
        </div>
        <div>
          {{ tasks[tasksCompleted].description }}
        </div>
        <blockquote class="px-2 border-l-2 text-sm">
          {{ tasks[tasksCompleted].quote }}
        </blockquote>
      </div>
      <div v-else class="flex-1">All Tasks Completed!</div>
      <UpDownButtons
        :down-icon="faUndo"
        :up-icon="faCheckCircle"
        :show-decrement="tasksCompleted > 0"
        :show-increment="tasksCompleted < 18"
        :class="{ 'text-black-.2': tasksCompleted >= 18 }"
        title="Tasks Completed"
        @increment="$emit('taskComplete')"
        @decrement="$emit('taskUndo')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { MercTask } from "../models/mercenary";
import UpDownButtons from "./UpDownButtons.vue";
import { faUndo, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

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
