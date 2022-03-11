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
    <div class="flex-1">
      <TaillessWrap :text="`${abilityName} ${activeTier}`" />
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
import { SpellSchool } from "../models/constants";
import { MaxAbilityTiers } from "../models/mercenary";
import TaillessWrap from "./atomic/TaillessWrap.vue";
import UpDownButtons from "./UpDownButtons.vue";

defineProps({
  abilityName: String,
  spell_school: String as () => SpellSchool,
  activeTier: Number,
  costToMax: Number,
});

defineEmits<{ (event: "increment"): void; (event: "decrement"): void }>();
</script>
