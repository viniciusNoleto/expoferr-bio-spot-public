<template>
  <ExpoButtonDynamicTag
    v-pv-tooltip:[position]="{
      value: tooltipText,
      autoHide: false
    }"
    class="
      inline-flex justify-center items-center relative
      overflow-hidden font-semibold
    "
    :class="[
      !invert ? 'flex-row':'flex-row-reverse',
      label && !padding ? 'px-4 py-2':'',
      loading ? 'cursor-progress':'',
      disabled ? 'opacity-50':'',
      label && icon ? gap:'',
      transitionClass,
      getColorClass,
      getTextClass,
      padding
    ]"
    :to="to"
    :disabled="disabled"
    @click="action"
  >
    <div v-if="!!slots['default']">
      <slot />
    </div>

    <Icon
      v-if="icon"
      :name="icon"
      :class="[
        iconClass,
        loading ? 'invisible':''
      ]"
    />

    <span
      v-if="label"
      class="uppercase"
      :class="[
        labelClass,
        loading ? 'invisible':''
      ]"
    >
      {{ label }}
    </span>

    <transition name="fade">
      <UtilsSpinner
        v-if="loading"
        :class="loadingClass"
        :mode="loadingMode"
        class="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
      />
    </transition>
  </ExpoButtonDynamicTag>
</template>

<script setup>

  const emit = defineEmits(['action']);

  const props = defineProps({
    icon: { // define o ícone a ser utilizado no botão, ou nenhum caso seja uma string vazia.
      type: String,
      default: ''
    },
    to: { // define o link a ser redirecionado ao clicar no botão.
      type: String,
      default: ''
    },
    iconClass: { // define o tamanho do ícone.
      type: [String, Array, Object],
      default: ''
    },
    label: { // define o texto de label do botão.
      type: String,
      default: ''
    },
    labelClass: { // define o tamanho do texto de label.
      type: [String, Array, Object],
      default: ''
    },
    tooltipText: { // define o texto a ser exibido quando ocorra um hover no botão.
      type: String,
      default: ''
    },
    tooltipPosition: { // define a posição do tooltip.
      type: String,
      default: 'top'
    },
    color: { // define a cor do botão a ser aplicada dentre as opções definidas no switch case da linha 132.
      type: String,
      default: 'primary'
    },
    colorClass: { // é utilizado quando se quer usar uma cor de botão que não se encaixa em nenhuma das opções do switch da linha 132, sendo escrito o modelo do botão na classe.
      type: [String, Array, Object],
      default: ''
    },
    fontClass: { // define o tamanho do texto do botão.
      type: [String, Array, Object],
      default: ''
    },
    transitionClass: {
      type: [String, Array, Object],
      default: 'transition-all duration-300'
    },
    padding: { // define a padding interna do componente.
      type: [String, Array, Object],
      default: ''
    },
    gap: { // define a gap interna do componente.
      type: [String, Array, Object],
      default: 'gap-1'
    },
    rounded: { // define o quão arredondado é o botão, funciona como um border-radius do tailwind.
      type: String,
      default: 'rounded-lg'
    },
    noBorder: { // define se o botão tem ou não borda.
      type: Boolean,
      default: false
    },
    noHover: { // define se o botão tem ou não um evento de hover.
      type: Boolean,
      default: false
    },
    loading: { // define o estado da animação de loading do botão.
      type: Boolean,
      default: false
    },
    loadingClass: { // é utilizado quando se quer mudar algum aspecto do loading que não o padrão, como tamanho, ícone, etc.
      type: [String, Array, Object],
      default: ''
    },
    loadingMode: { // define o tamanho do texto de label.
      type: String,
      default: undefined
    },
    disabled: { // define se o botão está habilitado ou não.
      type: Boolean,
      default: false
    },
    disabledColor: {
      type: String,
      default: 'gray'
    },
    disabledColorClass: {
      type: [String, Array, Object],
      default: ''
    },
    invert: { // inverte a ordem padrão do botão de ícone > texto para texto > ícone.
      type: Boolean,
      default: false
    },
  });

  const position = computed(() => ({
    position: props.tooltipPosition
  }));

  const hoverBase = 'hover:ring';

  function action(event) {
    if (!props.disabled && !props.loading) emit('action', event);
  }

  const getColorClass = computed(() => {
    if (props.colorClass) return props.colorClass;

    if (props.disabled && props.disabledColorClass) return props.disabledColorClass;

    switch (!props.disabled ? props.color : props.disabledColor) {
      case 'hover-primary':
        return 'focus:text-primary-600 hover:text-primary-500';
      case 'hover-complementary':
        return 'focus:text-complementary-600 hover:text-complementary-500';
      case 'hover-red':
        return 'focus:text-red-600 hover:text-red-500';
      case 'hover-gray':
        return 'focus:text-gray-600 hover:text-gray-500';
      case 'text-primary':
        return 'focus:text-primary-700 hover:text-primary-600 text-primary-500';
      case 'text-complementary':
        return 'focus:text-complementary-700 hover:text-complementary-600 text-complementary-500';
      case 'text-red':
        return 'focus:text-red-700 hover:text-red-600 text-red-500';
      case 'outline-primary':
        return [
          'focus:text-primary-700 hover:text-primary-600 text-primary-500 border border-primary-500',
          !props.noHover ? [
            hoverBase,
            'hover:ring-primary-500/30'
          ] : '',
          props.rounded,
        ];
      case 'outline-primary-dark':
        return [
          'focus:text-primary-700 hover:text-primary-600 text-subtitle border border-border hover:border-primary-500',
          !props.noHover ? [
            hoverBase,
            'hover:ring-primary-500/30'
          ] : '',
          props.rounded,
        ];
      case 'outline-complementary':
        return [
          'focus:text-complementary-700 hover:text-complementary-600 text-complementary-500 border border-complementary-500',
          !props.noHover ? [
            hoverBase,
            'hover:ring-complementary-500/30'
          ] : '',
          props.rounded,
        ];
      case 'outline-red':
        return [
          'focus:text-red-700 hover:text-red-600 text-red-500 border border-red-500',
          !props.noHover ? [
            hoverBase,
            'hover:ring-red-500/30'
          ] : '',
          props.rounded,
        ];
      case 'transparent-primary':
        return [
          'bg-primary-500/10 text-primary-500 hover:text-primary-600 focus:text-primary-700',
          !props.noHover ? [
            hoverBase,
            'hover:ring-primary-500/30'
          ] : '',
          props.rounded,
        ];
      case 'transparent-complementary':
        return [
          'bg-complementary-500/10 text-complementary-500 hover:text-complementary-600 focus:text-complementary-700',
          !props.noHover ? [
            hoverBase,
            'hover:ring-complementary-500/30'
          ] : '',
          props.rounded,
        ];
      case 'transparent-red':
        return [
          'bg-red-500/10 text-red-500 hover:text-red-600 focus:text-red-700',
          !props.noHover ? [
            hoverBase,
            'hover:ring-red-500/30'
          ] : '',
          props.rounded,
        ];
      case 'transparent-gray':
        return [
          'bg-gray-500/10 text-gray-500 hover:text-gray-600 focus:text-gray-700',
          !props.noHover ? [
            hoverBase,
            'hover:ring-gray-500/30'
          ] : '',
          props.rounded,
        ];
      case 'gray':
        return [
          'bg-gray-600 text-white',
          !props.noBorder ? 'border border-gray-600' : '',
          !props.noHover ? [
            hoverBase,
            'hover:ring-gray-600/30'
          ] : '',
          props.rounded,
        ];
      case 'red':
        return [
          'bg-red-500 text-white',
          !props.noBorder ? 'border border-red-600' : '',
          !props.noHover ? [
            hoverBase,
            'hover:ring-red-600/30'
          ] : '',
          props.rounded,
        ];
      case 'green':
        return [
          'bg-green-500 text-white',
          !props.noBorder ? 'border border-green-600' : '',
          !props.noHover ? [
            hoverBase,
            'hover:ring-green-600/30'
          ] : '',
          props.rounded,
        ];
      case 'complementary':
        return [
          'bg-complementary-500 text-white',
          !props.noBorder ? 'border border-complementary-600' : '',
          !props.noHover ? [
            hoverBase,
            'hover:ring-complementary-500/30'
          ] : '',
          props.rounded,
        ];
      case 'primary-light':
        return [
          'bg-primary-200 text-white',
          !props.noBorder ? 'border border-primary-300' : '',
          !props.noHover ? [
            hoverBase,
            'hover:ring-primary-200/30'
          ] : '',
          props.rounded,
        ];
      case 'primary':
      default:
        return [
          'bg-primary-500 text-white',
          !props.noBorder ? 'border border-primary-600' : '',
          !props.noHover ? [
            hoverBase,
            'hover:ring-primary-500/30'
          ] : '',
          props.rounded,
        ];
    }
  });

  const getTextClass = computed(() => {
    if (props.fontClass) return props.fontClass;
    if (!props.label) return 'text-md font-bold';
    if (props.icon && !props.iconClass) return 'text-sm';
    return 'text-xs font-bold';
  });

  const slots = useSlots();

</script>

<style scoped>
  .fade-enter-active {
    transition: opacity 0.8s ease;
  }

  .fade-leave-active {
    transition: opacity 0.1s linear;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
