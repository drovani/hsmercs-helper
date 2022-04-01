<template>
  <div
    class="grid justify-center text-center text-lg md:text-base"
    :class="[$slots.default ? 'grid-cols-3' : 'grid-cols-2']"
  >
    <button
      @click="$emit('decrement')"
      class="px-0.5"
      :class="{ invisible: !showDecrement }"
      :title="'Decrease ' + title"
    >
      <fa-icon :icon="downIcon" />
    </button>
    <slot />
    <button
      @click="$emit('increment')"
      class="px-0.5"
      :class="{ invisible: !showIncrement }"
      :title="'Increase ' + title"
    >
      <fa-icon :icon="upIcon" />
    </button>
  </div>
</template>

<script lang="ts">
import {
faArrowCircleDown,
faArrowCircleUp,
IconDefinition
} from "@fortawesome/free-solid-svg-icons";
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
    upIcon: {
      type: Object as () => IconDefinition,
      default: faArrowCircleUp,
    },
    downIcon: {
      type: Object as () => IconDefinition,
      default: faArrowCircleDown,
    },
  },
  emits: ["decrement", "increment"],
});
</script>
