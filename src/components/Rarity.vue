<template>
  <div>
    <img
      class="max-h-6 inline"
      :src="`/images/${rarity.toLowerCase()}.png`"
      :alt="rarity"
    />
  </div>
</template>

<script setup lang="ts">
import { Rarity } from "../models/constants";

defineProps({
  rarity: {
    type: String as () => Rarity,
    require: true,
  },
});
</script>
