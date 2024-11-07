<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :disabled="disabled"
  >
    <slot />
  </NuxtLink>

  <button
    v-else
    v-pv-ripple="{
      pt: {
        root: {
          class: !noRipple ? rippleClass:'bg-transparent'
        }
      }
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>

  defineProps({
    to: {
      type: [String, Object],
      default: null
    },
    noRipple: {
      type: Boolean,
      default: false
    },
    rippleClass: {
      type: [String, Array, Object],
      default: 'bg-white/50 dark:bg-slate-900/50'
    },
    disabled: {
      type: Boolean,
      default: false
    },
  });

</script>
