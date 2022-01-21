<template>
  <div>{{ role }}</div>
</template>

<script setup lang="ts">
import { Role } from "../models/roles";

defineProps({
  role: {
    type: String as () => Role,
    required: true,
  },
});
</script>
