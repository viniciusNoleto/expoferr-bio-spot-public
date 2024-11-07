<template>
  <section class="flex flex-col">
    <div
      v-for="(time, idx) in times"
      :key="idx"
      class="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
      :class="containerClass"
    >
      <div class="flex justify-center items-center">
        <div class="w-3.5 h-3.5 bg-primary-500 rounded-full" />
      </div>
      <span :class="titleClass">
        <slot name="title" :item="time">
          {{ _get(time, titleLabel) }}
        </slot>
      </span>
      <div class="h-full flex justify-center">
        <div v-if="idx < times.length-1" class="bg-gray-500/20 w-px h-full" />
      </div>
      <div :class="[wrapClass, wrapPadding]">
        <slot :item="time" />
      </div>
    </div>
  </section>
</template>

<script setup>

  defineProps({
    times: {
      type: Array,
      default: () => [],
    },
    titleLabel: {
      type: String,
      default: '',
    },
    containerClass: {
      type: [String, Array, Object],
      default: 'gap-x-2',
    },
    titleClass: {
      type: [String, Array, Object],
      default: 'text-sm font-semibold text-primary-600',
    },
    wrapClass: {
      type: [String, Array, Object],
      default: 'text-xs',
    },
    wrapPadding: {
      type: [String, Array, Object],
      default: 'pt-2.5 pb-4 px-1',
    },
  });

</script>
