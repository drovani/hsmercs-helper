<template>
  <div>
    <img
      class="max-h-6 inline"
      :src="`/images/${rarity.toLowerCase()}.png`"
      :alt="rarity"
    />
    {{ rarity }}
  </div>
</template>

<script setup lang="ts">
import { Rarity } from "../models/rarities";

defineProps({
  rarity: {
    type: String as () => Rarity,
    require: true,
  },
});
</script>
