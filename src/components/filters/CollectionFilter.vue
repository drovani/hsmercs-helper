<template>
  <div class="flex flex-col gap-4">
    <div class="bg-gray-600 text-white px-2 rounded">
      <div class="flex justify-around">
        <label>
          <input
            type="radio"
            name="collected"
            value="all"
            class="mr-0.5"
            :checked="enabledStatuses.collected === 'all'"
            @change="$emit('filterCollectedState', 'all')"
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="collected"
            value="false"
            class="mr-0.5"
            :checked="enabledStatuses.collected === false"
            @change="$emit('filterCollectedState', false)"
          />
          Uncollected
        </label>
        <label>
          <input
            type="radio"
            name="collected"
            value="true"
            class="mr-0.5"
            :checked="enabledStatuses.collected === true"
            @change="$emit('filterCollectedState', true)"
          />
          Collected
        </label>
      </div>
    </div>
    <div class="flex gap-2 bg-gray-600 text-white px-2 rounded">
      <label
        ><input
          type="checkbox"
          value="unlocks"
          class="mr-0.5"
          :checked="enabledStatuses.status === 'unlocks'"
          @change="$emit('toggleCollectedStatus', 'unlocks')"
        />Needs unlocks</label
      >
      <label
        ><input
          type="checkbox"
          value="maxed"
          class="mr-0.5"
          :checked="enabledStatuses.status === 'maxed'"
          @change="$emit('toggleCollectedStatus', 'maxed')"
        />Maxed!</label
      >
      <label
        ><input
          type="checkbox"
          value="completed"
          class="mr-1"
          :checked="enabledStatuses.status === 'completed'"
          @change="$emit('toggleCollectedStatus', 'completed')"
        />Completed</label
      >
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  enabledStatuses: {
    type: Object as () => {
      collected: true | false | "all";
      status: null | "unlocks" | "maxed" | "completed";
    },
  },
});
defineEmits<{
  (
    event: "toggleCollectedStatus",
    status: null | "unlocks" | "maxed" | "completed"
  ): void;
  (event: "filterCollectedState", status: true | false | "all"): void;
}>();
</script>
