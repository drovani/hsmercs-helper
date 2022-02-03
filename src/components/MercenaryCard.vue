<template>
  <div
    class="grid grid-rows-3 w-96 rounded-md border-2 gap-y-1 pb-1"
    :class="{
      'border-protector': role == 'Protector',
      'border-fighter': role == 'Fighter',
      'border-caster': role == 'Caster',
    }"
  >
    <div>
      <div
        class="flex justify-between px-2 py-1 text-white bg-gray-700 gap-4"
        :class="{
          'bg-protector': role == 'Protector',
          'bg-fighter': role == 'Fighter',
          'bg-caster': role == 'Caster',
        }"
      >
        <div class="cursor-pointer w-4">
          <icon
            v-if="collectedMerc ? collectedMerc.collected : false"
            :icon="['fas', 'check']"
            @click="$emit('removeFromCollection', mercName)"
          />
          <icon
            v-else
            :icon="['fas', 'plus']"
            @click="$emit('addToCollection', mercName)"
          />
        </div>
        <h2 class="font-bold text-xl whitespace-nowrap flex-1">
          <TaillessWrap :text="mercName" v-once />
        </h2>
        <RoleVue :role="role" v-once />
      </div>
      <div class="grid grid-cols-5 justify-around place-items-center px-2">
        <Attack :role="role" :attack="attack" />
        <TribeVue :tribe="tribe" v-once />
        <Health :role="role" :health="health" />
        <RarityVue class="col-span-2" :rarity="rarity" v-once />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-x-1">
      <AbilityStamp
        v-for="(ability, abilityName) in abilities"
        :key="abilityName"
        :ability="ability"
        :ability-name="abilityName"
        :active-tier="abilityActiveTier(abilityName)"
        class="rounded"
        @increment="$emit('abilityIncrement', mercName, abilityName)"
        @decrement="$emit('abilityDecrement', mercName, abilityName)"
      />
    </div>
    <div class="grid grid-cols-3 gap-x-1">
      <ItemStamp
        v-for="(item, itemName) in equipment"
        :key="itemName"
        :item="item"
        :item-name="itemName"
        :num-tiers="itemNumTiers(itemName)"
        :active-tier="itemActiveTier(itemName)"
        @increment="$emit('itemIncrement', mercName, itemName)"
        @decrement="$emit('itemDecrement', mercName, itemName)"
      />
    </div>
    <div>
      <TaskStamp
        :tasks-completed="collectedMerc?.tasksCompleted ?? 0"
        @task-complete="$emit('taskIncrement', mercName)"
        @task-undo="$emit('taskDecrement', mercName)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Rarity } from "../models/rarities";
import { Role } from "../models/roles";
import { Tribe } from "../models/tribes";
import AbilityStamp from "./AbilityStamp.vue";
import Attack from "./Attack.vue";
import Health from "./Health.vue";
import ItemStamp from "./ItemStamp.vue";
import RarityVue from "./Rarity.vue";
import RoleVue from "./Role.vue";
import TribeVue from "./Tribe.vue";
import TaillessWrap from "./TaillessWrap.vue";
import TaskStamp from "./TaskStamp.vue";
import CollectedMerc from "../models/collectedMerc";

const props = defineProps({
  role: String as () => Role,
  tribe: String as () => Tribe | null,
  rarity: String as () => Rarity,
  attack: Number,
  health: Number,
  abilities: Object,
  equipment: Object,
  tasks: Array,
  mercName: {
    type: String,
    required: true,
  },
  collectedMerc: Object as () => CollectedMerc,
});

function abilityActiveTier(abilityName: string): number {
  return props.collectedMerc?.abilities?.[abilityName] ?? 1;
}
function itemNumTiers(itemName: string): number {
  return props.equipment[itemName].tiers?.length ?? 1;
}
function itemActiveTier(itemName: string): number {
  return (
    props.collectedMerc?.equipment?.[itemName] ?? 4 - itemNumTiers(itemName) + 1
  );
}

defineEmits<{
  (event: "abilityIncrement", mercName: string, abilityName: string): void;
  (event: "abilityDecrement", mercName: string, abilityName: string): void;
  (event: "itemIncrement", mercName: string, itemName: string): void;
  (event: "itemDecrement", mercName: string, itemName: string): void;
  (event: "addToCollection", mercName: string): void;
  (event: "removeFromCollection", mercName: string): void;
  (event: "taskIncrement", mercName: string): void;
  (event: "taskDecrement", mercName: string): void;
}>();
</script>
