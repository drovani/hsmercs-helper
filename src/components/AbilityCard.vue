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
    <div class="h-32 rounded-full border-8 my-4 mx-8 flex flex-col font-bold">
      <div
        class="text-right bg-cooldown bg-no-repeat bg-right-top bg-contain py-0.5 pr-2.5 text-xl text-white"
        v-if="cooldown"
      >
        {{ cooldown }}
      </div>
      <div class="flex-grow"></div>
      <div class="text-center text-3xl" v-if="speed">
        <img src="/images/speed.png" class="inline h-8 -mr-10" />{{ speed }}
      </div>
    </div>
    <div>
      <TaillessWrap :text="`${abilityName} ${activeTier}`" />
    </div>
    <div class="flex-1 text-sm">{{ description }}</div>
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
import UpDownButtons from "./UpDownButtons.vue";
import TaillessWrap from "./TaillessWrap.vue";
import { SpellSchool } from "../models/constants";
import { MaxAbilityTiers } from "../models/mercenary";

defineProps({
  abilityName: String,
  spell_school: String as () => SpellSchool,
  activeTier: Number,
  costToMax: Number,
  speed: Number,
  cooldown: Number,
  description: String,
});

defineEmits<{ (event: "increment"): void; (event: "decrement"): void }>();
</script>
