<template>
  <div class="flex md:gap-2">
    <div
      v-for="rarity in Rarities"
      :key="rarity"
      @click="$emit('toggleRarity', rarity)"
      @dblclick="$emit('filterRarity', rarity)"
      class="cursor-pointer"
    >
      <img
        class="max-h-8 inline opacity-50"
        :class="{
          'opacity-100': enabledRarities.includes(rarity),
        }"
        :src="`/images/${rarity.toLowerCase()}.png`"
        :alt="rarity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rarities, Rarity } from "../models/constants";

defineProps({
  enabledRarities: {
    type: Array as () => Rarity[],
    default: [],
  },
});

defineEmits<{
  (event: "toggleRarity", rarity?: Rarity): void;
  (event: "filterRarity", rarity?: Rarity): void;
}>();
</script>
