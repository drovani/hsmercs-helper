<template>
  <div>
    <table>
      <template v-for="(zone, zonename) in bounties">
        <tr>
          <th colspan="6" class="py-2 bg-gray-200">{{ zonename }}</th>
        </tr>
        <tr class="bg-gray-100">
          <th>Bounty</th>
          <th>Level</th>
          <th>Heroic</th>
          <th colspan="3">Reward Possibilities</th>
        </tr>
        <tr v-for="bounty in zone">
          <td
            class="text-white px-2 rounded"
            :class="{
              'bg-protector': bounty.role === 'Protector',
              'bg-fighter': bounty.role === 'Fighter',
              'bg-caster': bounty.role === 'Caster',
              'bg-gray-800': !bounty.role,
            }"
          >
            {{ bounty.name }}
          </td>
          <td class="text-center">{{ bounty.levels?.[0] ?? 30 }}</td>
          <td class="text-center">{{ bounty.levels?.[1] ?? 30 }}</td>
          <td
            v-for="reward in bounty.rewards"
            :key="reward"
            @mouseenter="highlightMerc(reward)"
            @mouseleave="highlightMerc(null)"
          >
            <fa-icon class="pl-2 mr-1" :icon="faLock" v-if="hasUnlockable(bounty.name, reward)" />
            <MercName
              class="px-2 cursor-pointer"
              :merc-name="reward"
              :is-highlighted="reward === highlightedMerc"
            />
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script setup lang="ts">
import { Bounty } from "@/models/bounty";
import bountyjson from "@/static/bounties.json";
import { useMercStore } from "@/stores/mercenaries";
import MercName from "@bounties/MercName.vue";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { computed, ref } from "vue";

const store = useMercStore();

const highlightedMerc = ref<string>();

const bounties = computed(
  () => bountyjson.bounties as { [zone: string]: Bounty[] }
);

const hasUnlockable = computed(() => (bountyName: string, mercName: string) => {
  return store.getUnlocksForBounty(mercName, bountyName);
});

const highlightMerc = (mercName?: string) => {
  highlightedMerc.value = mercName;
};
</script>
