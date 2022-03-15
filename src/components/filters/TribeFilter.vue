<template>
  <div class="flex md:gap-2 rounded text-white bg-gray-600 px-2">
    <div v-for="(faction, label) in constructedTribes">
      <label>
        <input
          type="checkbox"
          :checked="isFactionChecked(faction)"
          @change="$emit('toggleFaction', faction)"
        />
        {{ label }}
      </label>
      <ul class="ml-4">
        <li v-for="tribe in faction">
          <label>
            <input
              type="checkbox"
              :checked="enabledTribes.includes(tribe)"
              :key="tribe"
              @change="$emit('toggleTribe', tribe)"
              class="mr-2"
            />{{ tribe }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
AllianceTribes,
HordeTribes,
NeutralTribes,
Tribe
} from "../../models/constants";

const props = defineProps({
  enabledTribes: {
    type: Array as () => Tribe[],
    default: [],
  },
});

const constructedTribes = computed(() => {
  return {
    "Alliance Tribes": [...AllianceTribes],
    "Horde Tribes": [...HordeTribes],
    "Neutral Tribes": [...NeutralTribes],
  };
});

const isFactionChecked = computed(() => (faction: string[]) => {
  return faction.every((f) => props.enabledTribes.includes(f as Tribe));
});

defineEmits<{
  (event: "toggleTribe", tribe?: Tribe): void;
  (event: "filterTribe", tribe?: Tribe): void;
  (event: "toggleFaction", tribes?: Tribe[]): void;
}>();
</script>
