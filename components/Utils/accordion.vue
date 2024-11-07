<template>
  <nav :class="[display, wrapperClass]">
    <header
      :class="{'cursor-pointer': !preventDefaultBarOpen}"
      @click="toggle"
    >
      <slot name="header">
        <div :class="headerClass">
          <slot name="header-label">
            <span :class="headerLabelClass">
              {{ header }}
            </span>
          </slot>
          <div class="center-flex">
            <Icon :name="open ? closeIcon : openIcon" />
          </div>
        </div>
      </slot>
    </header>

    <transition name="accordion">
      <section
        v-show="open"
        @drag.stop.prevent
      >
        <section :class="classes">
          <slot />
        </section>
      </section>
    </transition>

    <section
      v-if="!!slots['closed']"
      v-show="!open"
      @drag.stop.prevent
    >
      <slot name="closed" />
    </section>
  </nav>
</template>

<script setup>

  const props = defineProps({
    class: {
      type: [String, Array, Object],
      default: ''
    },
    wrapperClass: {
      type: [String, Array, Object],
      default: ''
    },
    display: {
      type: [String, Array, Object],
      default: 'flex flex-col'
    },
    bodyDisplay: {
      type: [String, Array, Object],
      default: 'flex flex-col'
    },
    preventDefaultBarOpen: {
      type: Boolean,
      default: false
    },
    startOpened: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    openIcon: {
      type: String,
      default: 'ep:arrow-down'
    },
    closeIcon: {
      type: String,
      default: 'ep:arrow-up'
    },
    header: {
      type: String,
      default: ''
    },
    headerLabelClass: {
      type: [String, Array, Object],
      default: ''
    },
    headerClass: {
      type: [String, Array, Object],
      default: 'flex justify-between'
    },
  });

  const slots = useSlots();

  const classes = computed(() => [props.bodyDisplay, props.class]);

  const open = defineModel('open', {
    type: Boolean,
    default: false
  });

  if (props.startOpened) open.value = true;

  function toggle() {
    if (!props.disabled && !props.preventDefaultBarOpen) open.value = !open.value;
  };

</script>
