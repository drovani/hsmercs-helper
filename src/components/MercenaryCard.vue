<template>
  <div>
    <header>
      <h2><slot /></h2>
      <Role :role="role" />
      <Tribe v-if="tribe" :tribe="tribe" />
      <Rarity :rarity="rarity" />
    </header>
    <Attack :role="role" :attack="attack" />
    <Health :role="role" :health="health" />
    <Ability
      v-for="(ability, abilityName) in abilities"
      :key="abilityName"
      :ability="ability"
      >{{ abilityName }}
    </Ability>
    <Item v-for="(item, itemName) in equipment" :key="itemName" :item="item"
      >{{ itemName }}
    </Item>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Ability from "./Ability.vue";
import Attack from "./Attack.vue";
import Health from "./Health.vue";
import Item from "./Item.vue";
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
    Ability,
    Attack,
    Health,
    Item,
    Rarity,
    Role,
    Tribe,
  },
});
</script>
