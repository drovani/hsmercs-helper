<template>
  <div>{{ role }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    role: {
      type: String,
      required: true,
    },
  },
});
</script>
