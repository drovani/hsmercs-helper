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
        class="flex justify-between px-2 py-1 text-white bg-gray-700"
        :class="{
          'bg-protector': role == 'Protector',
          'bg-fighter': role == 'Fighter',
          'bg-caster': role == 'Caster',
        }"
      >
        <h2 class="font-bold text-xl whitespace-nowrap">
          <slot />
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
        v-for="(ability, abilityName) in abilities"
        :key="abilityName"
        :ability="ability"
        class="rounded"
        >{{ abilityName }}
      </AbilityStamp>
    </div>
    <div class="grid grid-cols-3 gap-x-1">
      <ItemStamp
        v-for="(item, itemName) in equipment"
        :key="itemName"
        :item="item"
        >{{ itemName }}
      </ItemStamp>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Rarity } from "../models/rarities";
import { Role } from "../models/roles";
import { Tribe } from "../models/tribes";
import AbilityStamp from "./AbilityStamp.vue";
import Attack from "./Attack.vue";
import Health from "./Health.vue";
import ItemStamp from "./ItemStamp.vue";
import RarityVue from "./Rarity.vue";
import RoleVue from "./Role.vue";
import TribeVue from "./Tribe.vue";

export default defineComponent({
  props: {
    role: String as () => Role,
    tribe: String as () => Tribe | null,
    rarity: String as () => Rarity,
    attack: Number,
    health: Number,
    abilities: Object,
    equipment: Object,
    tasks: Array,
  },
  components: {
    Attack,
    Health,
    RarityVue,
    RoleVue,
    TribeVue,
    AbilityStamp,
    ItemStamp,
  },
});
</script>
