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
    </div>
    <div class="flex flex-wrap gap-2">
      <MercenaryCard
        v-for="(merc, mercName) in mercenaries"
        :key="mercName"
        v-bind="merc"
        >{{ mercName }}
      </MercenaryCard>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import { MercCollection } from "../models/mercCollection";
import MercFilter from "../models/mercFilter";
import { Rarities } from "../models/rarities";
import { Roles } from "../models/roles";
import mercjson from "../static/mercenaries.json";
import { GET_MERCENARIES, SET_MERCENARIES } from "../store/types";
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
      } as MercFilter,
    };
  },
  computed: {
    ...mapGetters([GET_MERCENARIES]),
    mercenaries(): MercCollection {
      return this[GET_MERCENARIES](this.filter);
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
    ...mapMutations([SET_MERCENARIES]),
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
  },
  mounted(): void {
    if (Object.keys(this.mercenaries ?? {}).length === 0) {
      this[SET_MERCENARIES](mercjson.mercenaries);
    }
  },
  components: { MercenaryCard, RoleFilter, RarityFilter },
});
</script>
