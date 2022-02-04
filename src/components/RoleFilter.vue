<template>
  <div
    v-for="role in Roles"
    :key="role"
    class="rounded-t-md px-2 gap-2 cursor-pointer opacity-50 flex justify-between flex-nowrap"
    :class="[
      'bg-' + role.toLowerCase(),
      { 'opacity-100': enabledRoles.includes(role) },
    ]"
    @click="$emit('filterRole', role)"
  >
    <img
      :src="`/assets/${role.toLowerCase()}-attack.png`"
      class="max-h-8 inline md:hidden lg:inline"
    />
    <div class="hidden md:block">{{ role }}s</div>
    <div
      class="hidden md:block opacity-50"
      :class="{
        'opacity-100': !enabledRoles.includes(role),
      }"
    >
      <icon
        :icon="[
          'fas',
          enabledRoles.includes(role) ? 'minus-circle' : 'plus-circle',
        ]"
        @click.stop="$emit('toggleRole', role)"
      />
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
