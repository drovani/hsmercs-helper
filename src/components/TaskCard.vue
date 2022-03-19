<template>
  <div class="p-1">
    <div v-if="tasksCompleted > 0">
      <div class="font-bold text-center">
        Task #{{ tasksCompleted }} Completed:<br />
        {{ tasks[tasksCompleted - 1]?.name }}
      </div>
    </div>
    <div class="flex mt-2 pt-2 border-t-2">
      <div v-if="tasksCompleted < 18" class="flex-1">
        <div class="flex">
          <div class="flex-1">Next Task: #{{ tasksCompleted + 1 }}</div>
          <UpDownButtons
            :down-icon="faUndo"
            :up-icon="faCheckCircle"
            :show-decrement="tasksCompleted > 0"
            :show-increment="tasksCompleted < 18"
            class="inline w-12"
            title="Tasks Completed"
            @increment="$emit('taskComplete')"
            @decrement="$emit('taskUndo')"
          />
        </div>
        <div class="font-bold">
          {{ tasks[tasksCompleted]?.name }}
        </div>
        <div>
          {{ tasks[tasksCompleted]?.description }}
        </div>
        <blockquote class="px-2 border-l-2 text-sm">
          {{ tasks[tasksCompleted]?.quote }}
        </blockquote>
      </div>
      <div v-else class="flex-1">
        All Tasks Completed!
        <fa-icon
          :icon="faUndo"
          class="inline text-black-.2 cursor-pointer pl-2"
          @click="$emit('taskUndo')"
        />
      </div>
    </div>
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
