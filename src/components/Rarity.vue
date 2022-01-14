<template>
  <div>{{ rarity }}</div>
</template>

<script setup lang="ts">
defineProps({
  rarity: {
    type: String,
    require: true,
  },
});
</script>
