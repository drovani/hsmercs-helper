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
            v-if="collected"
            :icon="['fas', 'check']"
            @click="$emit('removeFromCollection', mercName)"
            title="Remove from collection."
          />
          <icon
            v-else
            :icon="['fas', 'plus']"
            @click="$emit('addToCollection', mercName)"
            title="Add to collection."
          />
        </div>
        <h2 class="font-bold text-xl whitespace-nowrap flex-1">
          <router-link :to="'/merc/' + mercName" replace>
            <TaillessWrap :text="mercName" />
          </router-link>
        </h2>
        <RoleVue :role="role" />
      </div>
      <div class="grid grid-cols-5 justify-around place-items-center px-2">
        <Attack :role="role" :attack="attack" />
        <TribeVue :tribe="tribe" />
        <Health :role="role" :health="health" />
        <RarityVue class="col-span-2" :rarity="rarity" />
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
import AbilityStamp from "./AbilityStamp.vue";
import Attack from "./Attack.vue";
import Health from "./Health.vue";
import ItemStamp from "./ItemStamp.vue";
import RarityVue from "./Rarity.vue";
import RoleVue from "./Role.vue";
import TribeVue from "./Tribe.vue";
import TaillessWrap from "./TaillessWrap.vue";
import TaskStamp from "./TaskStamp.vue";
import {
  MercAbility,
  MercItem,
  MercTask,
} from "../models/mercenary";
import { computed } from "vue";
import { Role ,Rarity,Tribe} from "../models/constants";

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
  collected: Boolean,
});

const abilitiesOrdered = computed(() => {
  return props.abilities.sort((a, b) => a.unlock - b.unlock);
});
const equipmentOrdered = computed(() => {
  return props.equipment.sort((a, b) => a.position.localeCompare(b.position));
});

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
