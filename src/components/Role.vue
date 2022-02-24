<template>
  <div>
    <img
      :src="`/images/${role.toLowerCase()}-attack.png`"
      class="max-h-8"
      :title="role"
    />
  </div>
</template>

<script setup lang="ts">
import { Role } from "../models/constants";

defineProps({
  role: {
    type: String as () => Role,
    required: true,
  },
});
</script>
