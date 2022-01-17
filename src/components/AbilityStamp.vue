<template>
  <div class="border rounded text-sm sm:text-base text-center">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    ability: {
      type: Object,
      required: true,
    },
  },
});
</script>
