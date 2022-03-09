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
        v-if="activeCooldown"
      >
        {{ activeCooldown }}
      </div>
      <div class="flex-grow"></div>
      <div
        class="text-center text-3xl text-white text-outline-2"
        v-if="activeSpeed"
      >
        <img src="/images/speed.png" class="inline h-8 -mr-10" />{{
          activeSpeed
        }}
      </div>
    </div>
    <div class="-mt-4 mb-2 font-bold text-outline-2 text-white h-4">
      {{ spell_school }}
    </div>
    <div class="font-semibold">
      <TaillessWrap :text="`${abilityName} ${activeTier}`" />
    </div>
    <div v-if="summon" class="flex flex-col flex-1 text-xs px-1">
      <div class="flex-1">
        {{ summonDescription }}
      </div>
      <div class="grid grid-cols-3 justify-items-center items-center">
        <Attack class="w-6 h-8" :attack="summonAttack" />
        <Tribe class="h-6" :tribe="summon.tribe" />
        <Health class="w-6 h-8" :health="summonHealth" />
      </div>
    </div>
    <div
      v-else
      class="flex-1 text-sm px-1"
      :class="{
        'text-xs': activeDescription.length >= 85,
      }"
    >
      <TaillessWrap :text="activeDescription" />
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
import { AbilitySummon, MaxAbilityTiers } from "../models/mercenary";
import Attack from "./Attack.vue";
import Health from "./Health.vue";
import TaillessWrap from "./TaillessWrap.vue";
import Tribe from "./Tribe.vue";
import UpDownButtons from "./UpDownButtons.vue";

const props = defineProps({
  abilityName: String,
  spell_school: String as () => SpellSchool,
  activeTier: Number,
  costToMax: Number,
  speed: Number,
  cooldown: Number,
  description: String,
  summon: Object as () => AbilitySummon,
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
const activeSpeed = computed(() => {
  return (
    props.speed +
    (props.tiers[props.activeTier - 1].speed || 0) +
    (props.itemEquippedModifier?.speed || 0)
  );
});
const activeCooldown = computed(() => {
  return (
    props.cooldown +
    (props.tiers[props.activeTier - 1].cooldown || 0) +
    (props.itemEquippedModifier?.cooldown || 0)
  );
});
const summonAttack = computed(() => {
  if (props.summon) {
    return (
      props.summon.attack +
      (props.tiers[props.activeTier - 1].summon?.attack || 0) +
      (props.itemEquippedModifier?.summon?.attack || 0)
    );
  }
});
const summonHealth = computed(() => {
  if (props.summon) {
    return (
      props.summon.health +
      (props.tiers[props.activeTier - 1].summon?.health || 0) +
      (props.itemEquippedModifier?.summon?.health || 0)
    );
  }
});
const summonDescription = computed(() => {
  if (props.summon) {
    return descriptionBuilder(
      props.summon.description,
      props.tiers[props.activeTier - 1].summon?.description,
      props.itemEquippedModifier?.summon?.description
    );
  }
});

defineEmits<{ (event: "increment"): void; (event: "decrement"): void }>();
</script>
