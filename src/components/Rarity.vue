<template>
  <div>
    <img
      class="max-h-6 inline"
      :src="`./assets/${rarity.toLowerCase()}.png`"
      :alt="rarity"
    />
    {{ rarity }}
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
