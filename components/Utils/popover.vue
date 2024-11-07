<template>
  <PrimeVueOverlayPanel
    ref="popover"
    :pt="{
      content: {
        class: 'p-0'
      },
      root: {
        class: [
          'before:hidden after:hidden',
          margin
        ]
      }
    }"
  >
    <div :class="classes">
      <slot />
    </div>
  </PrimeVueOverlayPanel>
</template>

<script setup>

  import PrimeVueOverlayPanel from 'primevue/overlaypanel';

  const props = defineProps({
    display: {
      type: [String, Array, Object],
      default: 'flex flex-col',
    },
    class: {
      type: [String, Array, Object],
      default: '',
    },
    margin: {
      type: [String, Array, Object],
      default: 'm-0',
    },
  });

  const classes = computed(() => [
    props.display,
    props.class
  ]);

  const popover = ref();

  defineExpose({
    popover
  });

</script>
