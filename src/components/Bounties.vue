<template>
  <div>
    <table>
      <template v-for="(bounties, zone) in bountyjson.bounties">
        <tr>
          <th colspan="6">{{ zone }}</th>
        </tr>
        <tr>
          <th>Bounty</th>
          <th>Level</th>
          <th>Heroic</th>
          <th colspan="3">Reward Possibilities</th>
        </tr>
        <tr v-for="(info, bounty) in bounties">
          <td
            :class="{
              'bg-protector': info.role === 'Protector',
              'bg-fighter': info.role === 'Fighter',
              'bg-caster': info.role === 'Caster',
            }"
          >
            {{ bounty }}
          </td>
          <td>{{ info.levels?.[0] ?? 30 }}</td>
          <td>{{ info.levels?.[1] ?? 30 }}</td>
          <td>{{ info.rewards[0] }}</td>
          <td>{{ info.rewards[1] }}</td>
          <td>{{ info.rewards[2] }}</td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script setup lang="ts">
import bountyjson from "@/static/bounties.json";
</script>
