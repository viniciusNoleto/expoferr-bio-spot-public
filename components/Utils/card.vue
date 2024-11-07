<template>
  <section :class="[display, bg, rounded, padding, shadow]">
    <slot />
  </section>
</template>

<script setup>

  defineProps({
    display: {
      type: [String, Array, Object],
      default: 'flex flex-col',
    },
    bg: {
      type: [String, Array, Object],
      default: 'bg-zinc-50 dark:bg-zinc-900',
    },
    rounded: {
      type: [String, Array, Object],
      default: 'rounded-xl',
    },
    shadow: {
      type: [String, Array, Object],
      default: 'shadow-lg',
    },
    padding: {
      type: [String, Array, Object],
      default: 'p-4',
    },
  });

</script>
