<template>
  <div class="flex gap-2">
    <div
      v-for="rarity in Rarities"
      :key="rarity"
      @click="$emit('toggleRarity', rarity)"
      class="cursor-pointer"
    >
      <img
        class="max-h-8 inline opacity-50"
        :class="{
          'opacity-100': enabledRarities.includes(rarity),
        }"
        :src="`./assets/${rarity.toLowerCase()}.png`"
        :alt="rarity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rarities, Rarity } from "../models/rarities";

defineProps({
  enabledRarities: {
    type: Array as () => Rarity[],
    default: [],
  },
});

defineEmits<{
  (event: "toggleRarity", rarity?: Rarity): void;
}>();
</script>
