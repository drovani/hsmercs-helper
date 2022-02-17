<template>
  <div
    v-for="role in Roles"
    :key="role"
    class="rounded-t-md px-2 gap-2 cursor-pointer flex justify-between flex-nowrap"
    :class="{
      'bg-protector': role === 'Protector',
      'bg-fighter': role === 'Fighter',
      'bg-caster': role === 'Caster',
      'bg-opacity-50': !isEnabled(role)
    }"
    @click="$emit('filterRole', role)"
  >
    <img
      :src="`/images/${role.toLowerCase()}-attack.png`"
      class="max-h-8 inline md:hidden lg:inline"
    />
    <div class="hidden md:block">{{ role }}s</div>
    <div
      class="hidden md:block opacity-50"
      :class="{
        'opacity-100': !isEnabled(role),
      }"
    >
      <icon
        :icon="['fas', isEnabled(role) ? 'minus-circle' : 'plus-circle']"
        @click.stop="$emit('toggleRole', role)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Role, Roles } from "../models/roles";

const props = defineProps({
  enabledRoles: {
    type: Array as () => Role[],
    default: [],
  },
});

const isEnabled = computed(() => (role: Role) => {
  return props.enabledRoles.includes(role);
});

defineEmits<{
  (event: "filterRole", role: Role): void;
  (event: "toggleRole", role: Role): void;
}>();
</script>
