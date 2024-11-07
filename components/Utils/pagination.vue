<template>
  <div
    v-if="pagination.links && Array.isArray(pagination.links) && pagination.links.length > 3"
    class="flex flex-row flex-wrap gap-3"
  >
    <input
      v-model="absolutePage"
      type="number"
      class="rounded px-1 w-12 outline-0 bg-white shadow-sm text-center font-semibold appearance-none border border-theme-600/60"
      @input="absoluteInput"
    >

    <template v-for="(page, idx) in pagination.links" :key="idx">
      <button
        v-if="buttonsPermission(page.label)"
        class="hover:scale-[1.1] border text-sm px-2 rounded-md bg-white shadow-sm"
        :class="page.active ? 'border-theme-500/50':'border-gray-500/20'"
        @click="changePage(
          page.label,
          pagination.links[idx-1],
          pagination.links[idx+1]
        )"
      >
        {{ page.label }}
      </button>
    </template>
  </div>
</template>

<script setup>

  const props = defineProps({
    pagination: {
      type: Object,
      default: () => ({}),
    },
  });

  const emit = defineEmits(['change-page']);

  const absolutePage = ref(props.pagination.page);
  const inputTimer = ref(null);

  function getLabel(label) {
    label = label.toString();

    if (label === '' || label > props.pagination.last_page) return;

    return label;
  };

  function setGoto(label, previousLabel, nextLabel) {
    if (label !== '...') return label;
    if (previousLabel) previousLabel = parseInt(previousLabel.label);
    if (nextLabel) nextLabel = parseInt(nextLabel.label);

    return (Math.round((nextLabel - previousLabel) / 2) + previousLabel).toString();
  };

  function changePage(label, previousLabel, nextLabel) {
    emit('change-page', getLabel(
      setGoto(label, previousLabel, nextLabel)
    ));
  };

  function buttonsPermission(label) {
    if (label.match(/Previous/) || label.match(/Next/)) return false;
    return true;
  };

  function absoluteInput() {
    if (absolutePage.value < 1) return;
    if (inputTimer.value) clearTimeout(inputTimer.value);
    inputTimer.value = setTimeout(() => {
      emit('change-page', absolutePage.value)
    }, 1000);
  };

  watch(absolutePage, (newer) => {
    if (newer === '') return;
    if (newer < 1) absolutePage.value = 1;
    if (newer > props.pagination.last_page) absolutePage.value = props.pagination.last_page;
    if (!Number.isInteger(newer)) absolutePage.value = Math.round(absolutePage.value);
  });

  watch(() => props.pagination.page, (newer) => {
    absolutePage.value = newer;
  });

</script>
