<template>
  <div>{{ health }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    health: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "Neutral",
    },
  },
});
</script>
