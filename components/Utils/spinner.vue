<template>
  <Icon :name="name" />
</template>

<script lang="ts" setup>

  import { LOADING_ICON } from '~/shared/packages/constants/icons';

  const props = defineProps({
    mode: {
      type: String as PropType<'system'|'ring'>,
      default: 'system',
    },
  });

  const name = computed(() => {
    if (props.mode === 'ring') return 'svg-spinners:ring-resize';
    return LOADING_ICON;
  });

</script>
