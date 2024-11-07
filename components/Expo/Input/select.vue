<template>
  <PrimeVueSelect
    reset-filter-on-clear
    reset-filter-on-hide
    highlight-on-select
    focus-on-hover
    fluid
    size="small"
    :pt="{
      pcFilter: {
        root: {
          class: 'p-inputtext-sm'
        }
      }
    }"
  />
</template>

<script lang="ts" setup>

  import PrimeVueSelect from 'primevue/select';

</script>
