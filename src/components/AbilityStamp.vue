<template>
  <div
    class="flex flex-col border rounded text-sm sm:text-base text-center bg-gradient-to-t via-transparent"
    :class="{
      'from-arcane': ability.spell_school === 'Arcane',
      'from-fel': ability.spell_school === 'Fel',
      'from-fire': ability.spell_school === 'Fire',
      'from-frost': ability.spell_school === 'Frost',
      'from-holy': ability.spell_school === 'Holy',
      'from-nature': ability.spell_school === 'Nature',
      'from-shadow': ability.spell_school === 'Shadow',
    }"
  >
    <div class="flex-1">
      <TaillessWrap :text="`${abilityName} ${activeTier}`" />
    </div>
    <UpDownButtons
      :show-increment="activeTier < 5"
      :show-decrement="activeTier > 1"
      :class="{
        'text-black-.2': activeTier >= 5,
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
import { AbilityUpgradeCosts } from "../models/constants";
import { computed } from "vue";
import { MercAbility } from "../models/mercenary";

const props = defineProps({
  abilityName: {
    type: String,
    required: true,
  },
  ability: {
    type: Object as () => MercAbility,
    required: true,
  },
  activeTier: {
    type: Number,
    required: true,
  },
});

const costToMax = computed(() => {
  return AbilityUpgradeCosts.slice(props.activeTier).reduce(
    (c, p) => (c += p),
    0
  );
});

defineEmits<{ (event: "increment"): void; (event: "decrement"): void }>();
</script>
