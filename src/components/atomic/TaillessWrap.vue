<template>
  <span v-if="everythingElse">{{ everythingElse }}</span>
  <span class="whitespace-nowrap">{{ keepTogether }}</span>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
const everythingElse = computed(() => {
  return props.text.lastIndexOf(" ", props.text.lastIndexOf(" ") - 1) === -1
    ? null
    : props.text.slice(
        0,
        props.text.lastIndexOf(" ", props.text.lastIndexOf(" ") - 1) + 1
      );
});
const keepTogether = computed(() => {
  return props.text.lastIndexOf(" ", props.text.lastIndexOf(" ") - 1) === -1
    ? props.text
    : props.text.slice(
        props.text.lastIndexOf(" ", props.text.lastIndexOf(" ") - 1) + 1
      );
});
</script>
