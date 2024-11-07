<template>
  <PrimeVueDialog
    modal
    :header="title"
    :draggable="false"
    :closable="!persist"
    :dismissable-mask="!persist"
    :close-on-escape="!persist"
    class="w-full rounded-lg"
    :class="[size, modalClass]"
    :pt="{
      title: {
        class: titleClass
      },
      header: {
        class: 'p-4'
      }
    }"
  >
    <section :class="bodyClass">
      <slot />
    </section>
  </PrimeVueDialog>
</template>

<script setup>

  import PrimeVueDialog from 'primevue/dialog';

  const props = defineProps({
    persist: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    titleClass: {
      type: [String, Array, Object],
      default: 'text-xl font-bold text-primary-600',
    },
    size: {
      type: [String, Array, Object],
      default: 'max-w-4xl',
    },
    modalClass: {
      type: [String, Array, Object],
      default: '',
    },
    class: {
      type: [String, Array, Object],
      default: '',
    },
    display: {
      type: [String, Array, Object],
      default: 'flex flex-col',
    },
  });

  const bodyClass = computed(() => [
    props.class,
    props.display,
  ]);

</script>
