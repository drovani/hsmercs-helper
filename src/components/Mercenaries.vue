<template>
  <section>
    <h2>Mercenaries</h2>
    <MercenaryCard
      v-for="(merc, mercName) in mercenaries"
      :key="mercName"
      v-bind="merc"
      >{{ mercName }}
    </MercenaryCard>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { MercCollection } from "../models/mercCollection";
import mercjson from "../static/mercenaries.json";
import { SET_MERCENARIES } from "../store/types";
import MercenaryCard from "./MercenaryCard.vue";

export default defineComponent({
  computed: {
    mercenaries(): MercCollection {
      return this.$store.getters.getMercenaries;
    },
  },
  mounted(): void {
    if (Object.keys(this.mercenaries ?? {}).length === 0) {
      this.$store.commit(SET_MERCENARIES, mercjson.mercenaries);
    }
  },
  components: { MercenaryCard },
});
</script>
