<template>
  <div
    class="bg-center bg-no-repeat bg-contain h-10 whitespace-nowrap min-w-[6rem] flex justify-center items-center"
    :style="{
      'background-image': backgroundImage,
    }"
  >
    {{ tribe }}
  </div>
</template>

<script setup lang="ts">
import {
AllianceTribes,
HordeTribes,
NeutralTribes,
Tribe
} from "@/models/constants";
import { computed } from "vue";

const props = defineProps({
  tribe: {
    type: String as () => Tribe,
  },
});

const faction = computed((): string | null => {
  if (props.tribe === null) {
    return null;
  } else if (HordeTribes.includes(props.tribe as any)) {
    return "Horde";
  } else if (AllianceTribes.includes(props.tribe as any)) {
    return "Alliance";
  } else if (NeutralTribes.includes(props.tribe as any)) {
    return "Neutral";
  } else {
    return null;
  }
});

const backgroundImage = computed((): string => {
  if (faction.value === "Horde" || faction.value === "Alliance") {
    return `url('/images/${faction.value.toLowerCase()}-watermark.png')`;
  }
  return "unset";
});
</script>
