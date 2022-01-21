<template>
  <div class="flex gap-2">
    <div
      v-for="role in Roles"
      :key="role"
      class="rounded-t-md pl-6 pr-2 cursor-pointer opacity-50 flex"
      :class="[
        'bg-' + role.toLowerCase(),
        { 'opacity-100': enabledRoles.includes(role) },
      ]"
      @click="$emit('filterRole', role)"
    >
      <div>{{ role }}s</div>
      <div class="ml-6 font-mono" @click.stop="$emit('toggleRole', role)">
        <template v-if="enabledRoles.includes(role)">-</template>
        <template v-if="!enabledRoles.includes(role)">+</template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Role, Roles } from "../models/roles";

defineProps({
  enabledRoles: {
    type: Array as () => Role[],
    default: [],
  },
});

defineEmits<{
  (event: "filterRole", role: Role): void;
  (event: "toggleRole", role: Role): void;
}>();
</script>
