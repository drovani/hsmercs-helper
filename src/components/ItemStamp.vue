<template>
  <div class="flex flex-col border rounded text-sm sm:text-base text-center">
    <div class="flex-1">
      <TaillessWrap :text="`${itemName} ${activeTier}`" />
    </div>
    <UpDownButtons
      :show-increment="activeTier < 4"
      :show-decrement="activeTier > 4 - numTiers + 1"
      @increment="$emit('increment')"
      @decrement="$emit('decrement')"
    />
  </div>
</template>

<script setup lang="ts">
import TaillessWrap from "./TaillessWrap.vue";
import UpDownButtons from "./UpDownButtons.vue";

defineProps({
  itemName: {
    type: String,
    require: true,
  },
  item: {
    type: Object,
    require: true,
  },
  activeTier: {
    type: Number,
    required: true,
  },
  numTiers: {
    type: Number,
    required: true,
  },
});
defineEmits<{
  (event: "increment"): void;
  (event: "decrement"): void;
}>();
</script>
