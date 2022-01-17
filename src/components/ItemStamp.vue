<template>
  <div class="border rounded text-sm sm:text-base text-center">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
});
</script>
