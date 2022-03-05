<template>
  <div>
    <img
      class="max-h-6 inline"
      v-if="!$slots.default"
      :src="`/images/${rarity.toLowerCase()}.png`"
      :alt="rarity"
    />
    <div
      v-else
      class="bg-no-repeat bg-contain bg-center"
      :class="{
        'bg-rare': rarity === 'Rare',
        'bg-epic': rarity === 'Epic',
        'bg-legendary': rarity === 'Legendary',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rarity, Rarities } from "../models/constants";

defineProps({
  rarity: {
    type: String as () => Rarity,
    require: true,
  },
});
</script>
