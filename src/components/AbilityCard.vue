<template>
  <div
    class="flex flex-col border rounded text-sm sm:text-base text-center bg-gradient-to-t via-transparent"
    :class="{
      'from-arcane': spell_school === 'Arcane',
      'from-fel': spell_school === 'Fel',
      'from-fire': spell_school === 'Fire',
      'from-frost': spell_school === 'Frost',
      'from-holy': spell_school === 'Holy',
      'from-nature': spell_school === 'Nature',
      'from-shadow': spell_school === 'Shadow',
    }"
  >
    <div class="h-32 rounded-full border-8 my-2 mx-8 flex flex-col font-bold">
      <div
        class="text-right bg-cooldown bg-no-repeat bg-right-top bg-contain py-0.5 pr-3 text-3xl text-white text-outline-2"
        v-if="cooldown"
      >
        {{ cooldown }}
      </div>
      <div class="flex-grow"></div>
      <div class="text-center text-3xl text-white text-outline-2" v-if="speed">
        <img src="/images/speed.png" class="inline h-8 -mr-10" />{{ speed }}
      </div>
    </div>
    <div class="font-semibold">
      <TaillessWrap :text="`${abilityName} ${activeTier}`" />
    </div>
    <div
      class="flex-1 text-sm px-1"
      :class="{
        'text-xs': activeDescription.length >= 85,
      }"
    >
      <!-- <TaillessWrap :text="activeDescription" /> -->
      {{ activeDescription }}
    </div>
    <UpDownButtons
      :show-increment="activeTier < MaxAbilityTiers"
      :show-decrement="activeTier > 1"
      :class="{
        'text-black-.2': activeTier >= MaxAbilityTiers,
      }"
      title="Ability Active Tier"
      @increment="$emit('increment')"
      @decrement="$emit('decrement')"
      >{{ costToMax > 0 ? costToMax : "" }}</UpDownButtons
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import descriptionBuilder from "../common/description";
import { SpellSchool } from "../models/constants";
import { MaxAbilityTiers } from "../models/mercenary";
import TaillessWrap from "./TaillessWrap.vue";
import UpDownButtons from "./UpDownButtons.vue";

const props = defineProps({
  abilityName: String,
  spell_school: String as () => SpellSchool,
  activeTier: Number,
  costToMax: Number,
  speed: Number,
  cooldown: Number,
  description: String,
  tiers: Array as () => any[],
  itemEquippedModifier: {
    type: Object,
    required: false,
  },
});

const activeDescription = computed(() => {
  return descriptionBuilder(
    props.description,
    props.tiers[props.activeTier - 1].description,
    props.itemEquippedModifier?.description
  );
});

defineEmits<{ (event: "increment"): void; (event: "decrement"): void }>();
</script>
