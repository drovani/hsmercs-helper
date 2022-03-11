<template>
  <div class="flex flex-col border rounded text-sm sm:text-base text-center">
    <div class="flex-1">
      <TaillessWrap :text="`${itemName} ${activeTier}`" />
    </div>
    <UpDownButtons
      v-if="unlocked"
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
    <div v-else>
      {{ unlock }}
      <icon
        :icon="faLock"
        class="inline"
        :class="{
          'cursor-pointer': !unlock.startsWith('Task'),
        }"
        @click="$emit('toggleLock')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { MaxItemTiers } from "../models/mercenary";
import TaillessWrap from "./atomic/TaillessWrap.vue";
import UpDownButtons from "./UpDownButtons.vue";

const props = defineProps({
  itemName: String,
  activeTier: Number,
  tiers: Array,
  costToMax: Number,
  unlock: String,
  unlocked: Boolean,
});

defineEmits<{
  (event: "increment"): void;
  (event: "decrement"): void;
  (event: "toggleLock"): void;
}>();
</script>
