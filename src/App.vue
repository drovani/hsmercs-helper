<script setup lang="ts">
import Mercenaries from "./components/Mercenaries.vue";
</script>

<template>
  <header class="ml-2 py-2 md:ml-4 md:p-4 rounded-bl-md border-l-2 border-b-2 flex max-h-32">
    <router-link to="/" class="row-span-2 block">
      <img src="/images/mercenaries-icon.png" alt="" />
    </router-link>
    <div>
      <div class="text-2xl font-extrabold whitespace-nowrap">
        HSMercs Helper
      </div>
      <div class="font-light">
        A set of tools for Hearthstone Mercenaries players.
      </div>
    </div>
  </header>
  <Mercenaries></Mercenaries>
</template>
