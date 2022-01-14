<template>
  <div>{{ tribe }}</div>
</template>

<script setup lang="ts">
defineProps({
  tribe: {
    type: String,
    required: true,
  },
});
</script>
