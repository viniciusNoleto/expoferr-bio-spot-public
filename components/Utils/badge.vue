<template>
  <div class="shadow-sm center-flex" :class="[rounded, padding]">
    <slot />
  </div>
</template>

<script lang="ts" setup>

  defineProps({
    rounded: {
      type: [String, Array, Object],
      default: 'rounded-lg',
    },
    padding: {
      type: [String, Array, Object],
      default: 'p-1.5',
    },
  });

</script>
