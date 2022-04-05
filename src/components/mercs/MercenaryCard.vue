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
        class="flex justify-between px-2 py-1 text-white gap-4"
        :class="{
          'bg-protector': role == 'Protector',
          'bg-fighter': role == 'Fighter',
          'bg-caster': role == 'Caster',
        }"
      >
        <div class="cursor-pointer w-4">
          <fa-icon
            v-if="collected && isMaxed && tasksCompleted >= 18"
            :icon="faAward"
            @click="$emit('removeFromCollection', mercName)"
            title="Remove from collection."
          />
          <fa-icon
            v-else-if="collected && isMaxed"
            :icon="faCheckDouble"
            @click="$emit('removeFromCollection', mercName)"
            title="Remove from collection."
          />
          <fa-icon
            v-else-if="collected && !isMaxed"
            :icon="faCheck"
            @click="$emit('removeFromCollection', mercName)"
            title="Remove from collection."
          />
          <fa-icon
            v-else
            :icon="faPlus"
            @click="$emit('addToCollection', mercName)"
            title="Add to collection."
          />
        </div>
        <h2 class="font-bold text-xl whitespace-nowrap flex-1 text-outline-1">
          <router-link
            :to="{ name: 'mercs', params: { selectedMercName: mercName } }"
            replace
          >
            <TaillessWrap :text="mercName" />
          </router-link>
        </h2>
        <RarityVue :rarity="rarity" />
        <RoleVue :role="role" />
      </div>
      <div class="grid grid-cols-5 justify-around place-items-center px-2">
        <Attack :role="role" :attack="activeAttack" />
        <TribeVue :tribe="tribe" />
        <Health :role="role" :health="activeHealth" />
        <div v-if="!isMaxed" class="col-span-2 text-center">
          <img
            src="/images/mercenary-coin.png"
            alt="Merc coins"
            title="Cost remaining to Max"
            class="max-h-8 inline mr-2"
          />{{ costToMax }}
        </div>
        <div v-else class="col-span-2 text-center">Maxed!</div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-x-1">
      <AbilityStamp
        v-for="ability in abilitiesOrdered"
        :key="ability.abilityName"
        v-bind="ability"
        class="rounded"
        @increment="$emit('abilityIncrement', mercName, ability.abilityName)"
        @decrement="$emit('abilityDecrement', mercName, ability.abilityName)"
      />
    </div>
    <div class="grid grid-cols-3 gap-x-1">
      <ItemStamp
        v-for="item in equipmentOrdered"
        :key="item.itemName"
        v-bind="item"
        @increment="$emit('itemIncrement', mercName, item.itemName)"
        @decrement="$emit('itemDecrement', mercName, item.itemName)"
        @toggle-lock="$emit('itemToggleLock', mercName, item.itemName)"
      />
    </div>
    <div>
      <TaskStamp
        :tasks-completed="tasksCompleted"
        :tasks="tasks"
        class="h-12 mx-2"
        @task-complete="$emit('taskIncrement', mercName)"
        @task-undo="$emit('taskDecrement', mercName)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Rarity, Role, Tribe } from "@/models/constants";
import {
MaxItemTiers,
MercAbility,
MercItem,
MercTask
} from "@/models/mercenary";
import Attack from "@atomic/Attack.vue";
import Health from "@atomic/Health.vue";
import RarityVue from "@atomic/Rarity.vue";
import RoleVue from "@atomic/Role.vue";
import TaillessWrap from "@atomic/TaillessWrap.vue";
import TribeVue from "@atomic/Tribe.vue";
import {
faAward,
faCheck,
faCheckDouble,
faPlus
} from "@fortawesome/free-solid-svg-icons";
import AbilityStamp from "@mercs/AbilityStamp.vue";
import ItemStamp from "@mercs/ItemStamp.vue";
import TaskStamp from "@mercs/TaskStamp.vue";
import { computed } from "vue";

const props = defineProps({
  mercName: String,
  role: String as () => Role,
  rarity: String as () => Rarity,
  tribe: String as () => Tribe,
  attack: Number,
  health: Number,
  abilities: Array as () => MercAbility[],
  equipment: Array as () => MercItem[],
  tasks: Array as () => MercTask[],
  tasksCompleted: Number,
  itemEquipped: String,
  collected: Boolean,
});

const abilitiesOrdered = computed(() => {
  return props.abilities.sort((a, b) => a.unlock - b.unlock);
});
const equipmentOrdered = computed(() => {
  return props.equipment.sort((a, b) => a.position.localeCompare(b.position));
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
  (event: "addToCollection", mercName: string): void;
  (event: "removeFromCollection", mercName: string): void;
  (event: "taskIncrement", mercName: string): void;
  (event: "taskDecrement", mercName: string): void;
}>();
</script>
