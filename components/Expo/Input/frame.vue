<template>
  <div class="flex flex-col gap-1">
    <label class="text-sm font-semibold">
      {{ label }}
    </label>

    <slot />
  </div>
</template>

<script setup>

  defineProps({
    label: {
      type: String,
      default: ''
    },
  })

</script>
