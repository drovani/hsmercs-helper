<template>
  <div class="grid grid-rows-3" :class="['border-' + role.toLowerCase()]">
    <div>
      <div
        class="flex justify-between px-2 py-1 text-white"
        :class="['bg-' + role.toLowerCase()]"
      >
        <h2 class="font-bold">
          <slot />
        </h2>
        <Role :role="role" />
      </div>
      <div class="grid grid-cols-4 justify-around place-items-center px-2">
        <Attack :role="role" :attack="attack" />
        <Tribe :tribe="tribe" />
        <Health :role="role" :health="health" />
        <Rarity :rarity="rarity" />
      </div>
    </div>
    <div class="grid grid-cols-3">
      <AbilityStamp
        v-for="(ability, abilityName) in abilities"
        :key="abilityName"
        :ability="ability"
        class="rounded"
        >{{ abilityName }}
      </AbilityStamp>
    </div>
    <div class="grid grid-cols-3">
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
import AbilityStamp from "./AbilityStamp.vue";
import Attack from "./Attack.vue";
import Health from "./Health.vue";
import ItemStamp from "./ItemStamp.vue";
import Rarity from "./Rarity.vue";
import Role from "./Role.vue";
import Tribe from "./Tribe.vue";

export default defineComponent({
  props: {
    role: String,
    tribe: String,
    rarity: String,
    attack: Number,
    health: Number,
    abilities: Object,
    equipment: Object,
    tasks: Array,
  },
  components: {
    Attack,
    Health,
    Rarity,
    Role,
    Tribe,
    AbilityStamp,
    ItemStamp,
  },
});
</script>
