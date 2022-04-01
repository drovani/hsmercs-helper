<template>
  <section
    class="relative px-2 max-w-[400px] sm:max-w-[800px] lg:max-w-[1200px] xl:max-w-[1600px] 2xl:max-w-[2000px]"
  >
    <div
      class="text-white font-bold text-xl border-b-8 justify-center flex flex-wrap gap-2 md:gap-4 lg:gap-8 sticky top-0 bg-white"
      :class="[filterHighlightColor('border')]"
    >
      <div class="flex lg:gap-2">
        <div
          class="rounded-t-md px-2 pt-1 cursor-pointer whitespace-nowrap bg-gray-800 opacity-50"
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
      <div class="bg-gray-800 rounded-t-md px-1 w-10">
        <fa-icon-layers
          class="cursor-pointer"
          @click="showFilters = !showFilters"
        >
          <fa-icon size="lg" :icon="faFilter" class="text-gray-400" />
          <fa-icon
            v-if="
              filter.collectedStatuses.collected === false &&
              filter.collectedStatuses.status === null
            "
            :icon="faPlus"
            size="sm"
            transform="down-2 right-2"
            color="white"
          />
          <fa-icon
            v-if="
              filter.collectedStatuses.collected === true &&
              filter.collectedStatuses.status === null
            "
            :icon="faCheck"
            size="sm"
            transform="down-2 right-2"
            color="white"
          />
          <fa-icon
            v-if="filter.collectedStatuses.status === 'unlocks'"
            :icon="faLock"
            size="sm"
            transform="down-2 right-2"
            color="white"
          />
          <fa-icon
            v-if="filter.collectedStatuses.status === 'maxed'"
            :icon="faCheckDouble"
            size="sm"
            transform="down-2 right-2"
            color="white"
          />
          <fa-icon
            v-if="filter.collectedStatuses.status === 'completed'"
            :icon="faAward"
            size="sm"
            transform="down-2 right-2"
            color="white"
          />
        </fa-icon-layers>
      </div>
      <div class="flex md:gap-2">
        <div
          class="cursor-pointer flex flex-col justify-around bg-gray-800 rounded-t-md px-1"
          @click="toggleSort('name')"
        >
          <fa-icon
            :icon="sortNameIcon"
            size="lg"
            :class="{ 'text-gray-400': filter.sort.field !== 'name' }"
          />
        </div>
        <div
          class="cursor-pointer flex flex-col justify-around bg-gray-800 rounded-t-md px-1"
          @click="toggleSort('tasks')"
        >
          <fa-icon
            :icon="sortTasksIcon"
            size="lg"
            :class="{ 'text-gray-400': filter.sort.field !== 'tasks' }"
          />
        </div>
      </div>
      <div class="flex md:gap-2 bg-gray-800 rounded-t-md px-1">
        <div class="cursor-pointer flex flex-col justify-around">
          <label
            for="importCollection"
            title="Import JSON Mercenary Collection"
          >
            <fa-icon :icon="faFileImport" size="lg" />
            <input
              class="hidden"
              type="file"
              @change="importCollection"
              id="importCollection"
            />
          </label>
        </div>
        <div class="cursor-pointer flex flex-col justify-around">
          <a
            @click.prevent="exportCollection"
            title="Export JSON Mercenary Collection"
          >
            <fa-icon :icon="faFileExport" size="lg" />
          </a>
        </div>
      </div>
    </div>
    <div
      v-if="showFilters"
      class="px-2 pb-2 rounded-b-md flex gap-x-4"
      :class="[filterHighlightColor('bg')]"
    >
      <RarityFilter
        :enabled-rarities="filter.rarities"
        @toggle-rarity="toggleRarity"
        @filter-rarity="filterRarity"
      />
      <TribeFilter
        :enabled-tribes="filter.tribes"
        @toggle-tribe="toggleTribe"
        @filter-tribe="filterTribe"
        @toggle-faction="toggleFaction"
      />
      <CollectionFilter
        :enabled-statuses="filter.collectedStatuses"
        @filter-collected-state="filterCollectedState"
        @toggle-collected-status="toggleCollectedStatus"
      />
    </div>
    <Transition name="fade">
      <ModalOverlay v-if="selectedMercName" @close="unselectMerc">
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
    <div class="flex flex-wrap gap-2 justify-center mt-1">
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
Rarities,
Rarity,
Role,
Roles,
Tribe,
Tribes
} from "@/models/constants";
import { Mercenary } from "@/models/mercenary";
import MercFilter from "@/models/mercFilter";
import mercjson from "@/static/mercenaries.json";
import { useMercStore } from "@/stores/mercenaries";
import ModalOverlay from "@atomic/ModalOverlay.vue";
import CollectionFilter from "@filters/CollectionFilter.vue";
import RarityFilter from "@filters/RarityFilter.vue";
import RoleFilter from "@filters/RoleFilter.vue";
import TribeFilter from "@filters/TribeFilter.vue";
import {
faArrowDown19,
faArrowDown91,
faArrowDownAZ,
faArrowDownZA,
faAward,
faCheck,
faCheckDouble,
faFileExport,
faFileImport,
faFilter,
faLock,
faPlus,
IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import MercenaryCard from "@mercs/MercenaryCard.vue";
import MercenaryDetails from "@mercs/MercenaryDetails.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  selectedMercName: String,
});

const store = useMercStore();
const router = useRouter();

const showFilters = ref(false);
const filter = ref<MercFilter>({
  roles: [...Roles],
  rarities: [...Rarities],
  tribes: [...Tribes],
  collectedStatuses: {
    collected: "all",
    status: null,
  },
  sort: {
    field: "name",
    direction: "ascending",
  },
});

const mercenaries = computed((): Mercenary[] => {
  return store.filteredLibrary(filter.value);
});
const selectedMerc = computed((): Mercenary => {
  return store.getMercenary(props.selectedMercName);
});
const showingAllMercenaries = computed((): boolean => {
  return (
    filter.value.roles.length === Roles.length &&
    filter.value.rarities.length === Rarities.length &&
    filter.value.tribes.length === Tribes.length &&
    filter.value.collectedStatuses.collected === "all" &&
    filter.value.collectedStatuses.status === null
  );
});
const usingAdditionalFilters = computed((): boolean => {
  const filteringRoles = filter.value.roles.length !== Roles.length;
  const filteringRarities = filter.value.rarities.length !== Rarities.length;
  const filteringTribes = filter.value.tribes.length !== Tribes.length;
  const filteringCollected = filter.value.collectedStatuses.collected !== "all";
  const filteringStatus = filter.value.collectedStatuses.status !== null;

  return (
    filteringRoles ||
    filteringRarities ||
    filteringTribes ||
    filteringCollected ||
    filteringStatus
  );
});
const filterHighlightColor = computed(() => (prefix: string): string => {
  if (filter.value.roles.length === 1) {
    return `${prefix}-` + filter.value.roles[0].toLowerCase();
  } else {
    return `${prefix}-gray-800`;
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
  filter.value.tribes = [...Tribes];
  filter.value.collectedStatuses.collected = "all";
  filter.value.collectedStatuses.status = null;
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
function filterTribe(tribe: Tribe): void {
  filter.value.tribes = [tribe];
}
function toggleTribe(tribe: Tribe): void {
  const idx = filter.value.tribes.indexOf(tribe);
  if (idx < 0) {
    filter.value.tribes.push(tribe);
  } else {
    filter.value.tribes.splice(idx, 1);
  }
}
function toggleFaction(tribes: Tribe[]): void {
  if (tribes.every((t) => filter.value.tribes.includes(t))) {
    filter.value.tribes = filter.value.tribes.filter(
      (t) => !tribes.includes(t)
    );
  } else {
    const tribeSet = new Set(filter.value.tribes.concat(tribes));
    filter.value.tribes = Array.from(tribeSet);
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
function filterCollectedState(status: true | false | "all"): void {
  filter.value.collectedStatuses.collected = status;
}
function toggleCollectedStatus(
  status: "unlocks" | "maxed" | "completed"
): void {
  if (filter.value.collectedStatuses.status === status) {
    filter.value.collectedStatuses.status = null;
  } else {
    filter.value.collectedStatuses.status = status;
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
  router.push({ name: "mercs" });
}
onMounted(() => {
  if (Object.keys(mercenaries.value ?? {}).length === 0) {
    store.setMercLibrary(mercjson.mercenaries);
  }
});
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
