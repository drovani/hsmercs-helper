<template>
  <div>
    <img
      class="max-h-6 inline mr-1"
      :src="`./assets/${rarity.toLowerCase()}.png`"
      :alt="rarity"
    />{{ rarity }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  rarity: {
    type: String,
    require: true,
  },
});
</script>
