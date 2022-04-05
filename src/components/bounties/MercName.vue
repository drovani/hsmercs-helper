<template>
  <span
    class="rounded"
    :class="[
      isHighlighted
        ? [
            {
              'bg-amber-500': merc.rarity === 'Legendary',
              'bg-violet-500': merc.rarity === 'Epic',
              'bg-blue-500': merc.rarity === 'Rare',
            },
            'text-black',
          ]
        : merc.costToMax <= 0
        ? ['line-through', 'text-gray-300']
        : {
            'text-amber-500': merc.rarity === 'Legendary',
            'text-violet-500': merc.rarity === 'Epic',
            'text-blue-500': merc.rarity === 'Rare',
          },
    ]"
    >{{ merc.mercName }}</span
  >
</template>
<script setup lang="ts">
import { useMercStore } from "@/stores/mercenaries";
import { computed } from "vue";
const store = useMercStore();
const props = defineProps({
  mercName: String,
  isHighlighted: Boolean,
});

const merc = computed(() => {
  return store.getMercenary(props.mercName);
});
</script>
