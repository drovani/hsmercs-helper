<template>
  <div class="flex flex-col border rounded text-sm sm:text-base text-center">
    <div class="h-20 w-20 rounded border-8 my-8 mx-auto"></div>
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
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { computed } from "vue";
import { MaxItemTiers } from "../models/mercenary";
import TaillessWrap from "./TaillessWrap.vue";
import UpDownButtons from "./UpDownButtons.vue";

const props = defineProps({
  itemName: String,
  description: String,
  activeTier: Number,
  tiers: Array,
  costToMax: Number,
  unlock: String,
  unlocked: Boolean,
});

const activeDescription = computed(() => {
  let desc = props.description;
  const tier = filledTiers.value[props.activeTier - 1];

  if (tier.description !== undefined) {
    const tierDesc = Array.isArray(tier.description)
      ? tier.description
      : [tier.description];

    const regex = new RegExp(/\{([\w \(\)]+)\}/, "g");
    const matches = Array.from(desc.matchAll(regex));
    for (let i = 0; i < matches.length; i++) {
      if (Number.parseInt(matches[i][1]) !== NaN) {
        const baseValue = Number.parseInt(matches[i][1]);
        const tierValue = Number.parseInt(tierDesc[i]);

        desc = desc.replace(matches[i][0], String(baseValue + tierValue));
      } else if (typeof tierDesc[i] === "string") {
        desc = desc.replace(matches[i][0], tierDesc[i]);
      }
    }
  }

  return desc.replaceAll(/[\{\}]/g, "");
});

const filledTiers = computed(() => {
  return [...Array(4 - props.tiers.length), ...props.tiers];
});

defineEmits<{
  (event: "increment"): void;
  (event: "decrement"): void;
  (event: "toggleLock"): void;
}>();
</script>
