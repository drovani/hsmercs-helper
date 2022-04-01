<script setup lang="ts"></script>

<template>
  <header
    class="ml-2 py-2 md:ml-4 md:p-4 rounded-bl-md border-l-2 border-b-2 flex max-h-32"
  >
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
  <nav class="text-2xl font-bold flex gap-4">
    <h1>
      <router-link :to="{ name: 'mercs' }">
        Collectable Mercenaries
      </router-link>
    </h1>
    <h1>
      <router-link :to="{name: 'bounties'}">
      Bounty Tracker
      </router-link>
    </h1>
  </nav>
  <router-view></router-view>
</template>
