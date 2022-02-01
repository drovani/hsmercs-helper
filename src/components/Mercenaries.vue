<template>
  <section class="px-2">
    <h1 class="text-2xl font-bold m-8">Collectable Mercenaries</h1>
    <div
      class="flex text-white font-bold text-xl gap-2 mb-1 pl-4 border-b-8"
      :class="[filterBorderColor]"
    >
      <div
        class="bg-gray-800 rounded-t-md px-2 cursor-pointer opacity-50"
        :class="{
          'opacity-100': showingAllMercenaries,
        }"
        @click="showAllMercenaries"
      >
        All Mercenaries
      </div>
      <RoleFilter
        :enabled-roles="filter.roles"
        @filter-role="filterRole"
        @toggle-role="toggleRole"
      />
      <RarityFilter
        class="ml-8"
        :enabled-rarities="filter.rarities"
        @toggle-rarity="toggleRarity"
      />
      <div class="flex gap-2 ml-48">
        <div
          class="cursor-pointer rounded-t-md bg-gray-800 px-2"
          @click="sort('AZ')"
        >
          A-Z
        </div>
        <div
          class="cursor-pointer rounded-t-md bg-gray-800 px-2"
          @click="sort('ZA')"
        >
          Z-A
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-2">
      <MercenaryCard
        v-for="(merc, mercName) in mercenaries"
        :key="mercName"
        mercLibrary
        v-bind="merc"
        >{{ mercName }}
      </MercenaryCard>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import MercFilter from "../models/mercFilter";
import MercLibrary from "../models/mercLibrary";
import { Rarities } from "../models/rarities";
import { Roles } from "../models/roles";
import mercjson from "../static/mercenaries.json";
import { GET_MERC_LIBRARY, SET_MERC_LIBRARY } from "../store/types";
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
    ...mapGetters([GET_MERC_LIBRARY]),
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
    ...mapMutations([SET_MERC_LIBRARY]),
    showAllMercenaries(): void {
      this.filter.roles = [...Roles];
      this.filter.rarities = [...Rarities];
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
    toggleRarity(rarity: string): void {
      const idx = this.filter.rarities.indexOf(rarity);
      if (idx < 0) {
        this.filter.rarities.push(rarity);
      } else {
        this.filter.rarities.splice(idx, 1);
      }
    },
    sort(direction: "AZ" | "ZA"): void {
      this.filter.sort = direction;
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
