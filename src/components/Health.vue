<template>
  <div
    class="bg-center bg-contain bg-no-repeat text-center font-bold text-white w-10 h-10 text-xl p-2"
    :style="{
      'background-image': `url('/assets/${role.toLowerCase()}-health.png')`,
    }"
  >
    {{ health }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  health: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "Neutral",
  },
});
</script>
