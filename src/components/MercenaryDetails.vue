<template>
  <div
    class="grid grid-cols-4 w-full rounded-md border-2 gap-y-1 pb-1 max-w-[780px] mx-auto"
  >
    <div
      class="row-span-2 text-center border-2 m-2 rounded-xl"
      :class="{
        'border-protector': role == 'Protector',
        'border-fighter': role == 'Fighter',
        'border-caster': role == 'Caster',
      }"
    >
      <div class="text-2xl">{{ mercName }}</div>
      <div class="text-center">{{ level }}</div>
      <div class="grid grid-cols-3 justify-items-center">
        <Attack :attack="attack" :role="role" />
        <TribeVue :tribe="tribe" />
        <Health :health="health" :role="role" />
      </div>
    </div>
    <div class="col-span-3 text-center text-3xl">Abilities</div>
    <AbilityCard
      v-for="ability of abilitiesOrdered"
      :key="ability.abilityName"
      v-bind="ability"
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
      <div class="text-center text-3xl mt-2">
        <div v-if="isMaxed">Maxed!</div>
        <div v-else>
          <img
            src="/images/mercenary-coin.png"
            alt="Cost to max"
            title="Cost to max"
            class="w-12 inline"
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
      @increment="$emit('itemIncrement', mercName, item.itemName)"
      @decrement="$emit('itemDecrement', mercName, item.itemName)"
      @toggleLock="$emit('itemToggleLock', mercName, item.itemName)"
    />
  </div>
</template>
<script setup lang="ts">
import Attack from "./Attack.vue";
import Health from "./Health.vue";
import TribeVue from "./Tribe.vue";
import { MercAbility, MercItem, MercTask } from "../models/mercenary";
import { computed } from "vue";
import { Role, Rarity, Tribe } from "../models/constants";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import AbilityCard from "./AbilityCard.vue";
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
});

const abilitiesOrdered = computed(() => {
  return props.abilities.sort((a, b) => a.unlock - b.unlock);
});
const equipmentOrdered = computed(() => {
  return props.equipment.sort((a, b) => a.position.localeCompare(b.position));
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
