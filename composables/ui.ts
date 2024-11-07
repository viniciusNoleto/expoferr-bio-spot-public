
export const useApiImg = (img: string) => {
  return useEnv().APP_API_URL + 'images/' + img;
}


export const usePaginateFixedList = (list: ReactiveData<any[]>, per_page: number) => {

  const search = ref<GenericObject>({});

  const baseList = computed(() => useReactiveData(list).filter((item) => {

    if (!Object.keys(search.value).length) return true;

    return Object.keys(search.value).every((key) => {
      if (search.value[key] == null) return true;
      if (typeof search.value[key] === 'string') return item[key].toLowerCase().includes(search.value[key].toLowerCase());
      if (typeof search.value[key] === 'number') return item[key] == search.value[key];
      if (typeof search.value[key] === 'boolean') return item[key] == search.value[key];
      if (Array.isArray(search.value[key])) {
        if (typeof search.value[key] === 'string' || typeof search.value[key] === 'number') {
          return item[key].includes(search.value[key]);
        }
        return false;
      }
      return false;
    });

  }));

  const page = ref(1);

  const computedLinks = computed(() => Array.from(
    {
      length: Math.ceil(baseList.value.length / per_page)
    },
    (_, i) => ({
      label: (i + 1).toString(),
      active: page.value == i + 1,
    })
  ));

  function changePage(_page: number) {
    if (_page > 0 && _page < computedLinks.value.length + 1) page.value = _page;
  }

  const pagination = computed(() => ({
    per_page,
    page: page.value,
    links: computedLinks.value,
    last_page: computedLinks.value.length
  }));

  const computedList = computed(() => baseList.value.slice(
    (page.value - 1) * per_page,
    page.value * per_page
  ));

  return {
    search,
    changePage,
    pagination,
    list: computedList
  }

};
