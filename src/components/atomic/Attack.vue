<template>
  <div
    class="bg-center bg-contain bg-no-repeat flex justify-center items-center font-bold text-white w-10 h-10 text-xl p-2 text-outline-1"
    :style="{
      'background-image': `url('/images/${role.toLowerCase()}-attack.png')`,
    }"
  >
    {{ attack }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  attack: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "Neutral",
  },
});
</script>
