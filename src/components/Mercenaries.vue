<template>
  <section
    class="relative px-2 max-w-[400px] sm:max-w-[800px] lg:max-w-[1200px] xl:max-w-[1600px] 2xl:max-w-[2000px]"
  >
    <h1 class="text-2xl font-bold m-4 md:m-8">Collectable Mercenaries</h1>
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
          <span class="inline md:hidden text-outline-1">All</span>
          <span class="hidden md:inline text-outline-1">All Mercenaries</span>
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
    <Transition name="fade">
      <ModalOverlay v-if="selectedMerc" @close="unselectMerc">
        <MercenaryDetails
          v-bind="selectedMerc"
          class="mx-auto"
          @ability-increment="abilityIncrement"
          @ability-decrement="abilityDecrement"
          @item-increment="itemIncrement"
          @item-decrement="itemDecrement"
          @item-toggle-lock="itemToggleLock"
          @item-toggle-selected="itemToggleSelected"
          @add-to-collection="addCollectedMerc"
          @remove-from-collection="removeCollectedMerc"
          @task-increment="taskIncrement"
          @task-decrement="taskDecrement"
        />
      </ModalOverlay>
    </Transition>
    <div class="flex flex-wrap gap-2 justify-center">
      <MercenaryCard
        v-for="merc in mercenaries"
        :key="merc.mercName"
        v-bind="merc"
        @ability-increment="abilityIncrement"
        @ability-decrement="abilityDecrement"
        @item-increment="itemIncrement"
        @item-decrement="itemDecrement"
        @item-toggle-lock="itemToggleLock"
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
IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Rarities, Rarity, Role, Roles } from "../models/constants";
import { Mercenary } from "../models/mercenary";
import MercFilter from "../models/mercFilter";
import mercjson from "../static/mercenaries.json";
import { useMercStore } from "../stores/mercenaries";
import MercenaryCard from "./MercenaryCard.vue";
import MercenaryDetails from "./MercenaryDetails.vue";
import ModalOverlay from "./ModalOverlay.vue";
import RarityFilter from "./RarityFilter.vue";
import RoleFilter from "./RoleFilter.vue";

const store = useMercStore();
const router = useRouter();
const route = useRoute();

const filter = ref<MercFilter>({
  roles: [...Roles],
  rarities: [...Rarities],
  sort: {
    field: "name",
    direction: "ascending",
  },
});
const selectedMerc = ref<Mercenary>();

const mercenaries = computed((): Mercenary[] => {
  return store.filteredLibrary(filter.value);
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
  store.abilityIncrement(mercName, abilityName);
}
function abilityDecrement(mercName: string, abilityName: string): void {
  store.abilityDecrement(mercName, abilityName);
}
function itemIncrement(mercName: string, itemName: string): void {
  store.itemIncrement(mercName, itemName);
}
function itemDecrement(mercName: string, itemName: string): void {
  store.itemDecrement(mercName, itemName);
}
function itemToggleLock(mercName: string, itemName: string): void {
  store.itemToggleLock(mercName, itemName);
}
function itemToggleSelected(mercName: string, itemName: string): void {
  store.itemToggleSelected(mercName, itemName);
}
function taskIncrement(mercName: string): void {
  store.taskIncrement(mercName);
}
function taskDecrement(mercName: string): void {
  store.taskDecrement(mercName);
}
function addCollectedMerc(mercName: string): void {
  store.setCollectedForMerc(mercName, true);
}
function removeCollectedMerc(mercName: string): void {
  store.setCollectedForMerc(mercName, false);
}
function exportCollection() {
  const data = JSON.stringify({
    collection: store.collectionData,
  });
  const blob = new Blob([data], { type: "text/plain" }),
    a = document.createElement("a");
  a.download = "collection.json";
  a.href = window.URL.createObjectURL(blob);
  a.click();
  window.URL.revokeObjectURL(a.href);
}
function importCollection(event: InputEvent) {
  store.setMercCollection((<HTMLInputElement>event.target).files[0]);
}
function unselectMerc() {
  router.push("/");
}
onMounted(() => {
  if (Object.keys(mercenaries.value ?? {}).length === 0) {
    store.setMercLibrary(mercjson.mercenaries);
  }
});
watch(
  () => route.params,
  (toParams): void => {
    if (typeof toParams?.mercname === "string") {
      selectedMerc.value = mercenaries.value.find(
        (m) => m.mercName === toParams.mercname
      );
    } else {
      selectedMerc.value = undefined;
    }
  },
  { immediate: true }
);
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
