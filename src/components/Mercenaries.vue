<template>
  <section
    class="relative px-2 max-w-[400px] sm:max-w-[800px] lg:max-w-[1200px] xl:max-w-[1600px] 2xl:max-w-[2000px]"
  >
    <h1 class="text-2xl font-bold m-4 md:m-8">Collectable Mercenaries</h1>
    <div v-if="selectedMerc">
      <MercenaryDetails
        :merc-name="selectedMerc"
        :collected-merc="getCollectedMerc(selectedMerc)"
        v-bind="mercenaries[selectedMerc]"
        class="mx-auto"
      />
    </div>
    <div
      class="text-white font-bold text-xl mb-1 border-b-8 justify-center flex gap-2 md:gap-4 lg:gap-8 sticky top-0 bg-white"
      :class="[filterBorderColor]"
    >
      <div class="flex lg:gap-2">
        <div
          class="rounded-t-md px-2 cursor-pointer whitespace-nowrap bg-gray-800 opacity-50"
          :class="{ 'opacity-100': showingAllMercenaries }"
          @click.prevent="showAllMercenaries"
        >
          <span class="inline md:hidden">All</span>
          <span class="hidden md:inline">All Mercenaries</span>
        </div>
        <RoleFilter
          :enabled-roles="filter.roles"
          @filter-role="filterRole"
          @toggle-role="toggleRole"
        />
      </div>
      <RarityFilter
        :enabled-rarities="filter.rarities"
        @toggle-rarity="toggleRarity"
        @filter-rarity="filterRarity"
      />
      <div class="flex md:gap-2">
        <icon
          :icon="sortNameIcon"
          class="cursor-pointer rounded-t-md bg-gray-800 px-2 whitespace-nowrap h-full w-6"
          @click="toggleSort('name')"
        />
        <icon
          :icon="sortTasksIcon"
          class="cursor-pointer rounded-t-md bg-gray-800 px-2 whitespace-nowrap h-full w-6"
          @click="toggleSort('tasks')"
        />
      </div>
      <div class="flex md:gap-2 bg-gray-800 rounded-t-md px-1">
        <div class="cursor-pointer">
          <label
            for="importCollection"
            title="Import JSON Mercenary Collection"
          >
            <icon :icon="['fas', 'file-import']" />
            <input
              class="hidden"
              type="file"
              @change="importCollection"
              id="importCollection"
            />
          </label>
        </div>
        <div class="cursor-pointer">
          <a
            @click.prevent="exportCollection"
            title="Export JSON Mercenary Collection"
          >
            <icon :icon="['fas', 'file-export']" />
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-2 justify-center">
      <MercenaryCard
        v-for="(merc, mercName) in mercenaries"
        :key="mercName"
        :merc-name="(mercName as string)"
        :collected-merc="getCollectedMerc(mercName as string)"
        v-bind="merc"
        @ability-increment="abilityIncrement"
        @ability-decrement="abilityDecrement"
        @item-increment="itemIncrement"
        @item-decrement="itemDecrement"
        @add-to-collection="addCollectedMerc"
        @remove-from-collection="removeCollectedMerc"
        @task-increment="taskIncrement"
        @task-decrement="taskDecrement"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import {
  faArrowDown19,
  faArrowDown91,
  faArrowDownAZ,
  faArrowDownZA,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CollectedMerc from "../models/collectedMerc";
import MercFilter from "../models/mercFilter";
import MercLibrary from "../models/mercLibrary";
import { Rarities, Rarity } from "../models/rarities";
import { Role, Roles } from "../models/roles";
import mercjson from "../static/mercenaries.json";
import {
  ABILITY_DECREMENT,
  ABILITY_INCREMENT,
  ADD_MERC_TO_COLLECTION,
  CLEAR_MERC_COLLECTION,
  GET_COLLECTED_MERC,
  GET_MERC_COLLECTION,
  GET_MERC_LIBRARY,
  ITEM_DECREMENT,
  ITEM_INCREMENT,
  SET_MERC_COLLECTION,
  SET_MERC_LIBRARY,
  TASK_DECREMENT,
  TASK_INCREMENT,
} from "../store/types";
import MercenaryCard from "./MercenaryCard.vue";
import MercenaryDetails from "./MercenaryDetails.vue";
import RarityFilter from "./RarityFilter.vue";
import RoleFilter from "./RoleFilter.vue";
import { useStore } from "../store";
const store = useStore();
const route = useRoute();

const filter = ref<MercFilter>({
  roles: [...Roles],
  rarities: [...Rarities],
  sort: {
    field: "name",
    direction: "ascending",
  },
});
const selectedMerc = ref("");

const mercenaries = computed((): MercLibrary => {
  return store.getters[GET_MERC_LIBRARY](filter.value);
});
const showingAllMercenaries = computed((): boolean => {
  return (
    filter.value.roles.length === Roles.length &&
    filter.value.rarities.length === Rarities.length
  );
});
const filterBorderColor = computed((): string => {
  if (filter.value.roles.length === 1) {
    return "border-" + filter.value.roles[0].toLowerCase();
  } else {
    return "border-gray-800";
  }
});
const sortNameIcon = computed((): IconDefinition => {
  if (
    filter.value.sort.field === "name" &&
    filter.value.sort.direction === "descending"
  ) {
    return faArrowDownZA;
  } else {
    return faArrowDownAZ;
  }
});
const sortTasksIcon = computed((): IconDefinition => {
  if (
    filter.value.sort.field === "tasks" &&
    filter.value.sort.direction === "descending"
  ) {
    return faArrowDown91;
  } else {
    return faArrowDown19;
  }
});

function showAllMercenaries(): void {
  filter.value.roles = [...Roles];
  filter.value.rarities = [...Rarities];
}
function getCollectedMerc(mercName: string): CollectedMerc | undefined {
  return store.getters[GET_COLLECTED_MERC](mercName);
}
function filterRole(role: Role): void {
  filter.value.roles = [role];
}
function toggleRole(role: Role): void {
  const idx = filter.value.roles.indexOf(role);
  if (idx < 0) {
    filter.value.roles.push(role);
  } else {
    filter.value.roles.splice(idx, 1);
  }
}
function filterRarity(rarity: Rarity): void {
  filter.value.rarities = [rarity];
}
function toggleRarity(rarity: Rarity): void {
  const idx = filter.value.rarities.indexOf(rarity);
  if (idx < 0) {
    filter.value.rarities.push(rarity);
  } else {
    filter.value.rarities.splice(idx, 1);
  }
}
function toggleSort(field: "name" | "tasks"): void {
  if (field === filter.value.sort.field) {
    filter.value.sort.direction =
      filter.value.sort.direction === "ascending" ? "descending" : "ascending";
  } else {
    filter.value.sort = {
      field: field,
      direction: "ascending",
    };
  }
}
function abilityIncrement(mercName: string, abilityName: string): void {
  store.dispatch(ABILITY_INCREMENT, { mercName, abilityName });
}
function abilityDecrement(mercName: string, abilityName: string): void {
  store.dispatch(ABILITY_DECREMENT, { mercName, abilityName });
}
function itemIncrement(mercName: string, itemName: string): void {
  store.dispatch(ITEM_INCREMENT, { mercName, itemName });
}
function itemDecrement(mercName: string, itemName: string): void {
  store.dispatch(ITEM_DECREMENT, { mercName, itemName });
}
function taskIncrement(mercName: string): void {
  store.dispatch(TASK_INCREMENT, { mercName });
}
function taskDecrement(mercName: string): void {
  store.dispatch(TASK_DECREMENT, { mercName });
}
function addCollectedMerc(mercName: string): void {
  store.commit(ADD_MERC_TO_COLLECTION, { mercName, mercCollected: true });
}
function removeCollectedMerc(mercName: string): void {
  store.commit(ADD_MERC_TO_COLLECTION, { mercName, mercCollected: false });
}
function exportCollection() {
  const data = JSON.stringify({
    collection: store.getters[GET_MERC_COLLECTION],
  });
  const blob = new Blob([data], { type: "text/plain" }),
    a = document.createElement("a");
  a.download = "collection.json";
  a.href = window.URL.createObjectURL(blob);
  a.click();
  window.URL.revokeObjectURL(a.href);
}
function importCollection(event: InputEvent) {
  store.dispatch(SET_MERC_COLLECTION, {
    jsonMercCollectionFile: (<HTMLInputElement>event.target).files[0],
  });
}
function clearCollection() {
  if (confirm("Clear Mercenary Collection?")) {
    store.dispatch(CLEAR_MERC_COLLECTION);
  }
}
onMounted(() => {
  if (Object.keys(mercenaries ?? {}).length === 0) {
    store.dispatch(SET_MERC_LIBRARY, mercjson.mercenaries);
  }
});
watch(
  () => route.params,
  (toParams): void => {
    if (typeof toParams?.mercname === "string") {
      selectedMerc.value = toParams.mercname;
    }
  },
  { immediate: true }
);
</script>
