<template>
  <section class="flex flex-col gap-2">
    <section
      v-if="title || validSlot('title') || validSlot('functions')"
      class="flex flex-row items-center justify-between px-2 gap-4"
    >
      <slot name="title" :title-class="titleClass">
        <span :class="titleClass">
          {{ title }}
        </span>
      </slot>


      <slot name="functions" />
    </section>

    <section
      v-if="validSlot('filter')"
      :class="filterClass"
      @keyup.enter="emit('force-search')"
    >
      <slot name="filter" />
    </section>

    <section :class="{ 'overflow-x-auto': !notScrollable }">
      <table
        class="border-collapse"
        :class="!notScrollable ? 'min-w-full w-max' : 'w-full'"
      >
        <thead>
          <tr>
            <td
              v-if="order"
              :class="headerClass"
            >
              #
            </td>

            <td
              v-for="(column, columnIdx) in columns"
              :key="columnIdx"
              :class="headerClass"
            >
              <slot :name="`header:${column.field}`">
                {{ column.label }}
              </slot>
            </td>

            <td
              v-if="validSlot('actions')"
              :class="headerClass"
              class="sticky right-0 bg-white"
            >
              Ações
            </td>
          </tr>
        </thead>

        <tbody>
          <template v-if="loading && data.length === 0">
            <tr
              v-for="(line, lineIdx) in (pagination.per_page ?? 1)"
              :key="lineIdx"
              :class="[
                lineClass,
                lineIdx % 2 === 0 ? evenLineAlternationClass : oddLineAlternationClass
              ]"
            >
              <td
                v-for="(cell, cellIdx) in (columns.length + (order ? 1:0) + (validSlot('actions') ? 1:0))"
                :key="cellIdx"
                :class="cellClass"
              >
                <UtilsSkeleton class="scale-in-center my-0.5" :style="`--delay: ${line * 50}ms`" />
              </td>
            </tr>
          </template>

          <tr
            v-else-if="data.length === 0"
            :class="[lineClass, evenLineAlternationClass]"
          >
            <td
              :colspan="colspan"
              class="text-center"
              :class="[
                cellClass,
                !validSlot('footer') ? 'border-t':'border-y'
              ]"
            >
              {{ emptyText }}
            </td>
          </tr>

          <template v-else>
            <template v-for="(line, idx) in data" :key="idx">
              <tr
                :class="[
                  lineClass,
                  loading ? 'opacity-50' : '',
                  idx % 2 === 0 ? evenLineAlternationClass : oddLineAlternationClass
                ]"
              >
                <td v-if="order">
                  <div class="text-center" :class="cellClass">
                    {{ calcIdx(idx) }}{{ ordinal }}
                  </div>
                </td>

                <td
                  v-for="column in columns"
                  :key="column.field"
                >
                  <div :class="cellClass">
                    <slot
                      :name="`cell:${column.field}`"
                      :item="line"
                      :index="idx"
                    >
                      <span>
                        {{ getText(line, column.field) }}
                      </span>
                    </slot>
                  </div>
                </td>

                <td v-if="validSlot('actions')" class="sticky right-0">
                  <div :class="[actionsClass, cellClass]">
                    <slot
                      name="actions"
                      :item="line"
                      :index="idx"
                    />
                  </div>
                </td>
              </tr>
            </template>

            <tr
              v-if="validSlot('footer')"
              :class="lineClass"
            >
              <slot name="footer" />
            </tr>
          </template>
        </tbody>
      </table>
    </section>

    <div class="flex flex-row justify-center">
      <UtilsPagination
        :pagination="pagination"
        @change-page="emit('change-page', $event)"
      />
    </div>
  </section>
</template>

<script lang="ts" generic="D extends object = object" setup>

  const emit = defineEmits(['change-page', 'force-search']);

  type Column = {
    field: string,
    label: string,
  }

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    titleClass: {
      type: [String, Array, Object],
      default: 'text-xl font-bold text-theme-600',
    },
    headerClass: {
      type: [String, Array, Object],
      default: 'uppercase text-xs font-bold text-center p-2 border-b border-gray-500/10 bg-zinc-50',
    },
    filterClass: {
      type: [String, Array, Object],
      default: 'responsive-flex gap-4 mt-2 mb-4',
    },
    functionsClass: {
      type: [String, Array, Object],
      default: 'flex flex-row gap-2',
    },
    actionsClass: {
      type: [String, Array, Object],
      default: 'flex flex-row gap-2 items-center justify-center',
    },
    lineClass: {
      type: [String, Array, Object],
      default: '[&:hover>*]:bg-[#edeef0]',
    },
    cellClass: {
      type: [String, Array, Object],
      default: 'py-2 px-4 text-sm',
    },
    order: {
      type: Boolean,
      default: false
    },
    ordinal: {
      type: String,
      default: ''
    },
    columns: {
      type: Array as PropType<Column[]>,
      default: () => []
    },
    data: {
      type: Array as PropType<D[]>,
      default: () => []
    },
    defaultValuesObject: {
      type: Object,
      default: () => ({})
    },
    defaultGlobalValue: {
      type: [String, Number],
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    notScrollable: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: 'Nenhum dado encontrado'
    },
    evenLineAlternationClass: {
      type: String,
      default: '*:bg-zinc-100'
    },
    oddLineAlternationClass: {
      type: String,
      default: '*:bg-zinc-50'
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
  });

  const slots = useSlots();

  function validSlot(slot: string) {
    return !!slots[slot];
  }

  function calcIdx(idx: number) {
    return (idx + 1) + ((props.pagination.per_page ?? 0) * ((props.pagination.page ?? 0) - 1));
  }

  function getText(line: object, field: string) {
    return _get(line, field) ?? props.defaultValuesObject[field] ?? props.defaultGlobalValue;
  }

  const colspan = computed(() => props.columns.length + (validSlot('actions') ? 1 : 0) + (props.order ? 1 : 0));

</script>

<style scoped>

  .scale-in-center {
    -webkit-animation: scale-in-center 0.45s var(--delay) cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            animation: scale-in-center 0.45s var(--delay) cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @-webkit-keyframes scale-in-center {
    0% {
      -webkit-transform: scale(0);
              transform: scale(0);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(1);
              transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes scale-in-center {
    0% {
      -webkit-transform: scale(0);
              transform: scale(0);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(1);
              transform: scale(1);
      opacity: 1;
    }
  }

  .table-accordion-transition-enter-from > * > *, .table-accordion-transition-leave-to > * > * {
    @apply max-h-0;
  }

  .table-accordion-transition-enter-to > * > *, .table-accordion-transition-leave-from > * > * {
    @apply max-h-[1000px];
  }

  .table-accordion-transition-enter-active > * > * {
    @apply overflow-hidden transition-[max-height] duration-1000 ease-in-out;
  }

  .table-accordion-transition-leave-active > * > * {
    @apply overflow-hidden transition-[max-height] duration-[300ms] ease-in;
  }

</style>
