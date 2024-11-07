<template>
  <div class="flex gap-1.5">
    <div
      v-for="(clearStep, idx) in formatedSteps"
      :key="idx"
      class="flex flex-col gap-1.5"
      :style="{ width: `${clearStep.percentage}%` }"
    >
      <span v-if="clearStep.label" class="text-center text-xs font-bold">
        {{ clearStep.label }}
      </span>

      <div
        class="h-2.5 border border-gray-500/50 rounded-full shadow"
      >
        <div
          class="bg-gradient-to-r from-emerald-600/80 to-emerald-700/80 h-full rounded-full"
          :style="{ width: `${getStepOwnPercentage(clearStep.range)}%` }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

  type stepGettersFunction = (step: string|number|object) => string|number;

  const props = defineProps({
    actual: {
      type: Number,
      required: true,
    },
    steps: {
      type: Array as PropType<object[]|string[]>,
      default: () => [],
    },
    stepLabel: {
      type: [String, Number, Function] as PropType<string|number|stepGettersFunction>,
      default: undefined,
    },
    stepPercentage: {
      type: [String, Number, Function] as PropType<string|number|stepGettersFunction>,
      default: undefined,
    },
  });

  function getPercentage(step?: string|object) {
    if (step && typeof step === 'object') {
      if (props.stepPercentage) {
        if (typeof props.stepPercentage === 'function') {
          return props.stepPercentage(step) as string|number|undefined;
        } return _get(step, props.stepPercentage) as string|number|undefined;
      } return undefined;
    } return undefined;
  }

  function getLabel(step?: string|object) {
    if (step && typeof step === 'object') {
      if (props.stepLabel) {
        if (typeof props.stepLabel === 'function') {
          return props.stepLabel(step) as string|number|undefined;
        } return _get(step, props.stepLabel) as string|number|undefined;
      } return undefined;
    } return step;
  }

  const stepsBase = computed(() => {
    if (props.steps.length) {
      return props.steps.map((step) => {
        return {
          label: getLabel(step),
          percentage: getPercentage(step) ?? 0,
        };
      });
    }

    return [{
      label: undefined,
      percentage: 100,
    }];
  });

  const formatedSteps = computed(() => {
    return stepsBase.value.map((step, idx) => {
      const min = stepsBase.value.slice(0, idx).reduce((acc, step) => acc + Number(step.percentage), 0);
      const max = stepsBase.value.slice(0, idx + 1).reduce((acc, step) => acc + Number(step.percentage), 0);

      return {
        label: step.label,
        percentage: step.percentage,
        range: { min, max },
      };
    });
  });

  function getStepOwnPercentage(percentage: { min: number, max: number }) {
    if (props.actual <= percentage.min) return 0;
    if (props.actual >= percentage.max) return 100;
    return (props.actual / percentage.max) * 100;
  }

</script>
