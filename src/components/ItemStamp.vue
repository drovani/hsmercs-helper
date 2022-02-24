<template>
  <div class="flex flex-col border rounded text-sm sm:text-base text-center">
    <div class="flex-1">
      <TaillessWrap :text="`${itemName} ${activeTier}`" />
    </div>
    <UpDownButtons
      :show-increment="activeTier < MaxItemTiers"
      :show-decrement="activeTier > MaxItemTiers - tiers.length + 1"
      :class="{
        'text-black-.2': activeTier >= MaxItemTiers,
      }"
      title="Item Active Tier"
      @increment="$emit('increment')"
      @decrement="$emit('decrement')"
      >{{ costToMax > 0 ? costToMax : "" }}</UpDownButtons
    >
  </div>
</template>

<script setup lang="ts">
import TaillessWrap from "./TaillessWrap.vue";
import UpDownButtons from "./UpDownButtons.vue";
import { MaxItemTiers } from "../models/mercenary";

defineProps({
  itemName: String,
  activeTier: Number,
  tiers: Array,
  costToMax: Number,
});

defineEmits<{
  (event: "increment"): void;
  (event: "decrement"): void;
}>();
</script>
