<template>
  <div
    class="bg-center bg-no-repeat bg-contain h-10 whitespace-nowrap min-w-[6rem] text-center"
    :style="{
      'background-image': faction == 'Neutral' ? 'unset' : `url('/assets/${faction.toLowerCase()}-watermark.png')`,
    }"
  >
    <span class="align-middle">{{ tribe }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  tribe: {
    type: String,
  },
});
const horde = [
  "Blood Elf",
  "Goblin",
  "Half-Orc",
  "Orc",
  "Tauren",
  "Troll",
  "Undead",
];
const alliance = [
  "Draenei",
  "Dwarf",
  "Gnome",
  "High Elf",
  "Human",
  "Night Elf",
];

const faction = computed(() => {
  return horde.indexOf(props.tribe) >= 0
    ? "Horde"
    : alliance.indexOf(props.tribe) >= 0
    ? "Alliance"
    : "Neutral";
});
</script>
