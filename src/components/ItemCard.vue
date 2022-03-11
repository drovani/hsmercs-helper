<template>
  <div class="flex flex-col border rounded text-sm sm:text-base text-center">
    <div
      class="h-20 w-20 rounded border-8 my-8 mx-auto text-black flex flex-col"
    >
      <div class="flex-grow"></div>
      <icon
        v-if="unlocked"
        :icon="selected ? faCheck : faThumbTack"
        class="block self-end cursor-pointer"
        @click="$emit('toggleSelected')"
      />
    </div>
    <div class="font-semibold">
      <TaillessWrap :text="`${itemName} ${activeTier}`" />
    </div>
    <div class="flex-1 text-sm">
      <TaillessWrap :text="activeDescription" />
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
      ><div>
        {{ costToMax > 0 ? costToMax : "" }}
        <icon
          v-if="unlock.startsWith('Defeat')"
          :icon="faUnlock"
          class="inline"
          @click="$emit('toggleLock')"
        /></div
    ></UpDownButtons>
    <div v-else class="px-2">
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
import {
faCheck,
faLock,
faThumbTack,
faUnlock
} from "@fortawesome/free-solid-svg-icons";
import { computed } from "vue";
import descriptionBuilder from "../common/description";
import { MaxItemTiers } from "../models/mercenary";
import TaillessWrap from "./atomic/TaillessWrap.vue";
import UpDownButtons from "./UpDownButtons.vue";

const props = defineProps({
  itemName: String,
  description: String,
  activeTier: Number,
  tiers: Array,
  costToMax: Number,
  unlock: String,
  unlocked: Boolean,
  selected: Boolean,
});

const activeDescription = computed(() => {
  return descriptionBuilder(
    props.description,
    filledTiers.value[props.activeTier - 1].description
  );
});

const filledTiers = computed(() => {
  return [...Array(MaxItemTiers - props.tiers.length), ...props.tiers];
});

defineEmits<{
  (event: "increment"): void;
  (event: "decrement"): void;
  (event: "toggleLock"): void;
  (event: "toggleSelected"): void;
}>();
</script>
