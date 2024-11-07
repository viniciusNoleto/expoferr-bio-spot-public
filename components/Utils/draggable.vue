<template>
  <draggable :list="list" class="dragArea list-group" :class="draggableClass">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="list-group-item cursor-move"
      :class="itemClass"
    >
      <slot :item="item" :index="index">
        {{ item }}
      </slot>
    </div>
  </draggable>
</template>

<script setup>

  import { VueDraggableNext as draggable } from 'vue-draggable-next';

  defineProps({
    list: {
      type: Array,
      required: true
    },
    draggableClass: {
      type: [Array, Object, String],
      default: '',
    },
    itemClass: {
      type: [Array, Object, String],
      default: '',
    },
  });

</script>
