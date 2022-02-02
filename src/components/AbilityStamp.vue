<template>
  <div class="flex flex-col border rounded text-sm sm:text-base text-center">
    <div class="flex-1">
      <TaillessWrap :text="`${abilityName} ${activeTier}`" />
    </div>
    <UpDownButtons
      :show-increment="activeTier < 5"
      :show-decrement="activeTier > 1"
      @increment="$emit('increment')"
      @decrement="$emit('decrement')"
    />
  </div>
</template>

<script setup lang="ts">
import UpDownButtons from "./UpDownButtons.vue";
import TaillessWrap from "./TaillessWrap.vue";

defineProps({
  abilityName: {
    type: String,
    required: true,
  },
  ability: {
    type: Object,
    required: true,
  },
  activeTier: {
    type: Number,
    required: true,
  },
});

defineEmits<{ (event: "increment"): void; (event: "decrement"): void }>();
</script>
