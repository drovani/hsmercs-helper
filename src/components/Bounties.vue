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
          <td class="pr-2">
            <MercName :merc-name="bounty.rewards[0]" />
          </td>
          <td class="pr-2">
            <MercName :merc-name="bounty.rewards[1]" />
          </td>
          <td>
            <MercName :merc-name="bounty.rewards[2]" />
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script setup lang="ts">
import { Bounty } from "@/models/bounty";
import bountyjson from "@/static/bounties.json";
import MercName from "@bounties/MercName.vue";
import { computed } from "vue";

const bounties = computed(
  () => bountyjson.bounties as { [zone: string]: Bounty[] }
);
</script>
