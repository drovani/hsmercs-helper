<template>
  <div class="border rounded text-sm sm:text-base text-center">
    <span v-if="everythingElse">{{ everythingElse }}</span>
    <span class="whitespace-nowrap">{{ keepTogether }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    abilityName: {
      type: String,
      required: true,
    },
    ability: {
      type: Object,
      required: true,
    },
  },
  computed: {
    everythingElse(): string {
      return this.abilityName.lastIndexOf(" ") === -1
        ? null
        : this.abilityName.slice(0, this.abilityName.lastIndexOf(" ") + 1);
    },
    keepTogether(): string {
      return (
        (this.abilityName.lastIndexOf(" ") === -1
          ? this.abilityName
          : this.abilityName.slice(this.abilityName.lastIndexOf(" ") + 1)) + " 1"
      );
    },
  },
});
</script>
