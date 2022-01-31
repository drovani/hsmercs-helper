<template>
  <div class="flex flex-col border rounded text-sm sm:text-base text-center">
    <div class="flex-1">
      <TaillessWrap :text="`${itemName} 1`" />
    </div>
    <UpDownButtons
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
});
defineEmits<{
  (event: "increment"): void;
  (event: "decrement"): void;
}>();
</script>
