<template>
  <div
    class="grid grid-cols-4 w-full rounded-md border-2 gap-y-1 p-1 max-w-[780px] mx-auto space-x-1"
  >
    <div
      class="row-span-2 text-center border-2 rounded-xl"
      :class="{
        'border-protector': role == 'Protector',
        'border-fighter': role == 'Fighter',
        'border-caster': role == 'Caster',
      }"
    >
      <div class="border-8 rounded-full h-48 m-2"></div>
      <div class="text-2xl">{{ mercName }}</div>
      <div class="text-center text-white text-lg font-bold text-outline-2">
        <RarityVue :rarity="rarity">{{ level }}</RarityVue>
      </div>
      <div class="grid grid-cols-3 justify-items-center">
        <Attack :attack="activeAttack" :role="role" />
        <TribeVue :tribe="tribe" />
        <Health :health="activeHealth" :role="role" />
      </div>
    </div>
    <div class="col-span-3 text-center text-3xl">Abilities</div>
    <AbilityCard
      v-for="ability of abilitiesOrdered"
      :key="ability.abilityName"
      v-bind="ability"
      :item-equipped-modifier="itemEquippedModifier(ability.abilityName)"
      @increment="$emit('abilityIncrement', mercName, ability.abilityName)"
      @decrement="$emit('abilityDecrement', mercName, ability.abilityName)"
    />
    <div class="row-span-2">
      <TaskCard
        :tasks="tasks"
        :tasks-completed="tasksCompleted"
        @task-complete="$emit('taskIncrement', mercName)"
        @task-undo="$emit('taskDecrement', mercName)"
      />
      <div
        class="text-center text-2xl mt-2 text-white font-bold text-outline-2"
      >
        <div v-if="isMaxed">Maxed!</div>
        <div v-else>
          <img
            src="/images/mercenary-coin.png"
            alt="Cost to max"
            title="Cost to max"
            class="w-8 inline"
          />
          {{ costToMax }}
        </div>
      </div>
    </div>
    <div class="col-span-3 text-center text-3xl">Equipment</div>
    <ItemCard
      v-for="item of equipmentOrdered"
      :key="item.itemName"
      v-bind="item"
      :selected="itemEquipped === item.itemName"
      @increment="$emit('itemIncrement', mercName, item.itemName)"
      @decrement="$emit('itemDecrement', mercName, item.itemName)"
      @toggle-lock="$emit('itemToggleLock', mercName, item.itemName)"
      @toggle-selected="$emit('itemToggleSelected', mercName, item.itemName)"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Rarity, Role, Tribe } from "../models/constants";
import {
MaxItemTiers,
MercAbility,
MercItem,
MercTask
} from "../models/mercenary";
import AbilityCard from "./AbilityCard.vue";
import Attack from "./atomic/Attack.vue";
import Health from "./atomic/Health.vue";
import RarityVue from "./atomic/Rarity.vue";
import TribeVue from "./atomic/Tribe.vue";
import ItemCard from "./ItemCard.vue";
import TaskCard from "./TaskCard.vue";

const props = defineProps({
  mercName: String,
  role: String as () => Role,
  rarity: String as () => Rarity,
  tribe: String as () => Tribe,
  attack: Number,
  health: Number,
  level: Number,
  abilities: Array as () => MercAbility[],
  equipment: Array as () => MercItem[],
  tasks: Array as () => MercTask[],
  tasksCompleted: Number,
  collected: Boolean,
  itemEquipped: String,
});

const abilitiesOrdered = computed(() => {
  return props.abilities.sort((a, b) => a.unlock - b.unlock);
});
const equipmentOrdered = computed(() => {
  return props.equipment.sort((a, b) => a.position.localeCompare(b.position));
});
const itemEquippedModifier = computed(() => (abilityName: string) => {
  if (props.itemEquipped) {
    const item = props.equipment.find((i) => i.itemName === props.itemEquipped);
    if (item.affects) {
      if (
        (typeof item.affects === "string" && item.affects === abilityName) ||
        (Array.isArray(item.affects) &&
          item.affects.some((a) => a === abilityName))
      ) {
        if (item.modifier) {
          return item.modifier;
        } else {
          return item.tiers[
            item.activeTier - 1 - (MaxItemTiers - item.tiers.length)
          ].modifier;
        }
      }
    }
  }
});
const activeAttack = computed(() => {
  return (
    props.attack +
    (isMaxed.value ? 1 : 0) +
    (itemActiveTier.value?.modifier?.attack || 0)
  );
});
const activeHealth = computed(() => {
  return (
    props.health +
    (isMaxed.value ? 5 : 0) +
    (itemActiveTier.value?.modifier?.health || 0)
  );
});

const itemActiveTier = computed(() => {
  if (props.itemEquipped) {
    const item = props.equipment.find((i) => i.itemName === props.itemEquipped);
    const activeTier =
      item.tiers[item.activeTier - 1 - (MaxItemTiers - item.tiers.length)];
    return activeTier;
  }
});

const costToMax = computed(() => {
  let cost = 0;
  for (const ability of props.abilities) {
    cost += ability.costToMax;
  }
  for (const item of props.equipment) {
    cost += item.costToMax;
  }
  return cost;
});

const isMaxed = computed(() => {
  return costToMax.value <= 0 && props.equipment.every((item) => item.unlocked);
});

defineEmits<{
  (event: "abilityIncrement", mercName: string, abilityName: string): void;
  (event: "abilityDecrement", mercName: string, abilityName: string): void;
  (event: "itemIncrement", mercName: string, itemName: string): void;
  (event: "itemDecrement", mercName: string, itemName: string): void;
  (event: "itemToggleLock", mercName: string, itemName: string): void;
  (event: "itemToggleSelected", mercName: string, itemName: string): void;
  (event: "addToCollection", mercName: string): void;
  (event: "removeFromCollection", mercName: string): void;
  (event: "taskIncrement", mercName: string): void;
  (event: "taskDecrement", mercName: string): void;
}>();
</script>
