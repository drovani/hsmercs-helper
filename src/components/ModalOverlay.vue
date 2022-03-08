<template>
  <div
    class="fixed inset-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white shadow-2xl rounded-lg">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineEmits<{
  (event: "close"): void;
}>();
</script>
