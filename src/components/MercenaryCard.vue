<template>
  <div>
    <header>
      <h2><slot /></h2>
      <div>{{ race }}</div>
    </header>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    role: String,
    race: String,
    rarity: String,
  },
});
</script>
