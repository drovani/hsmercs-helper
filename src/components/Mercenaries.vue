<template>
  <section class="px-2">
    <h1 class="text-2xl font-bold m-4 md:m-8">Collectable Mercenaries</h1>
    <div
      class="text-white font-bold text-xl mb-1 border-b-8 justify-center flex gap-2 md:gap-4 lg:gap-8"
      :class="[filterBorderColor]"
    >
      <div class="flex lg:gap-2">
        <div
          class="bg-gray-800 rounded-t-md px-2 cursor-pointer opacity-50 whitespace-nowrap"
          :class="{
            'opacity-100': showingAllMercenaries,
          }"
          @click="showAllMercenaries"
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
          :icon="[
            'fas',
            filter.sort === 'ZA' ? 'arrow-down-z-a' : 'arrow-down-a-z',
          ]"
          class="cursor-pointer rounded-t-md bg-gray-800 px-2 whitespace-nowrap h-full w-6"
          @click="toggleSort"
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
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import CollectedMerc from "../models/collectedMerc";
import MercFilter from "../models/mercFilter";
import MercLibrary from "../models/mercLibrary";
import { Rarities } from "../models/rarities";
import { Roles } from "../models/roles";
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
TASK_INCREMENT
} from "../store/types";
import MercenaryCard from "./MercenaryCard.vue";
import RarityFilter from "./RarityFilter.vue";
import RoleFilter from "./RoleFilter.vue";

export default defineComponent({
  data: () => {
    return {
      Roles,
      filter: {
        roles: [...Roles],
        rarities: [...Rarities],
        sort: "AZ",
      } as MercFilter,
    };
  },
  computed: {
    ...mapGetters([GET_MERC_LIBRARY, GET_COLLECTED_MERC, GET_MERC_COLLECTION]),
    mercenaries(): MercLibrary {
      return this[GET_MERC_LIBRARY](this.filter);
    },
    showingAllMercenaries(): boolean {
      return (
        this.filter.roles.length === Roles.length &&
        this.filter.rarities.length === Rarities.length
      );
    },
    filterBorderColor(): string {
      if (this.filter.roles.length === 1) {
        return "border-" + this.filter.roles[0].toLowerCase();
      } else {
        return "border-gray-800";
      }
    },
  },
  methods: {
    ...mapMutations([
      SET_MERC_LIBRARY,
      ADD_MERC_TO_COLLECTION,
      CLEAR_MERC_COLLECTION,
    ]),
    ...mapActions([
      ABILITY_INCREMENT,
      ABILITY_DECREMENT,
      ITEM_INCREMENT,
      ITEM_DECREMENT,
      TASK_INCREMENT,
      TASK_DECREMENT,
      SET_MERC_COLLECTION,
    ]),
    showAllMercenaries(): void {
      this.filter.roles = [...Roles];
      this.filter.rarities = [...Rarities];
    },
    getCollectedMerc(mercName: string): CollectedMerc | undefined {
      return this[GET_COLLECTED_MERC](mercName);
    },
    filterRole(role: string): void {
      this.filter.roles = [role];
    },
    toggleRole(role: string): void {
      const idx = this.filter.roles.indexOf(role);
      if (idx < 0) {
        this.filter.roles.push(role);
      } else {
        this.filter.roles.splice(idx, 1);
      }
    },
    filterRarity(rarity: string): void {
      this.filter.rarities = [rarity];
    },
    toggleRarity(rarity: string): void {
      const idx = this.filter.rarities.indexOf(rarity);
      if (idx < 0) {
        this.filter.rarities.push(rarity);
      } else {
        this.filter.rarities.splice(idx, 1);
      }
    },
    toggleSort(): void {
      this.filter.sort = this.filter.sort === "AZ" ? "ZA" : "AZ";
    },
    abilityIncrement(mercName: string, abilityName: string): void {
      this[ABILITY_INCREMENT]({ mercName, abilityName });
    },
    abilityDecrement(mercName: string, abilityName: string): void {
      this[ABILITY_DECREMENT]({ mercName, abilityName });
    },
    itemIncrement(mercName: string, itemName: string): void {
      this[ITEM_INCREMENT]({ mercName, itemName });
    },
    itemDecrement(mercName: string, itemName: string): void {
      this[ITEM_DECREMENT]({ mercName, itemName });
    },
    taskIncrement(mercName: string): void {
      this[TASK_INCREMENT]({ mercName });
    },
    taskDecrement(mercName: string): void {
      this[TASK_DECREMENT]({ mercName });
    },
    addCollectedMerc(mercName: string): void {
      this[ADD_MERC_TO_COLLECTION]({ mercName, mercCollected: true });
    },
    removeCollectedMerc(mercName: string): void {
      this[ADD_MERC_TO_COLLECTION]({ mercName, mercCollected: false });
    },
    exportCollection() {
      const data = JSON.stringify({
        collection: this[GET_MERC_COLLECTION],
      });
      const blob = new Blob([data], { type: "text/plain" }),
        a = document.createElement("a");
      a.download = "collection.json";
      a.href = window.URL.createObjectURL(blob);
      a.click();
      window.URL.revokeObjectURL(a.href);
    },
    importCollection(event: InputEvent) {
      this[SET_MERC_COLLECTION]({
        jsonMercCollectionFile: (<HTMLInputElement>event.target).files[0],
      });
    },
    clearCollection() {
      if (confirm("Clear Mercenary Collection?")) {
        this[CLEAR_MERC_COLLECTION]();
      }
    },
  },
  mounted(): void {
    if (Object.keys(this.mercenaries ?? {}).length === 0) {
      this[SET_MERC_LIBRARY](mercjson.mercenaries);
    }
  },
  components: { MercenaryCard, RoleFilter, RarityFilter },
});
</script>
