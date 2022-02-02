<template>
  <div
    class="grid justify-center text-center text-xl sm:text-base"
    :class="{ 'grid-cols-3': $slots.default, 'grid-cols-2': !$slots.default }"
  >
    <button
      @click="$emit('decrement')"
      class="px-0.5"
      :class="{ invisible: !showDecrement }"
      :title="'Decrease ' + title"
    >
      <icon :icon="['fas', downIcon]"></icon>
    </button>
    <slot />
    <button
      @click="$emit('increment')"
      class="px-0.5"
      :class="{ invisible: !showIncrement }"
      :title="'Increase ' + title"
    >
      <icon :icon="['fas', upIcon]"></icon>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    showDecrement: {
      type: Boolean,
      default: true,
    },
    showIncrement: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "Value",
    },
    upIcon: { type: String, default: "arrow-circle-up" },
    downIcon: {
      type: String,
      default: "arrow-circle-down",
    },
  },
  emits: ["decrement", "increment"],
});
</script>
