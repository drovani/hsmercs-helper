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
    itemName: {
      type: String,
      require: true,
    },
    item: {
      type: Object,
      require: true,
    },
  },
  computed: {
    everythingElse(): string {
      return this.itemName.lastIndexOf(" ") === -1
        ? null
        : this.itemName.slice(0, this.itemName.lastIndexOf(" ") + 1);
    },
    keepTogether(): string {
      return (
        (this.itemName.lastIndexOf(" ") === -1
          ? this.itemName
          : this.itemName.slice(this.itemName.lastIndexOf(" ") + 1)) + " 1"
      );
    },
  },
});
</script>
