<template>
  <div>{{ attack }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    attack: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
    },
  },
});
</script>
