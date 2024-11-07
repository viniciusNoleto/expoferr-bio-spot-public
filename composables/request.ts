import type { UnwrapRef } from 'vue';


export const useResetErrors = (errors: ApiErrors) => {
  _forOwn(errors, (value: string[]|ApiErrors, key: string) => {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length > 0) _set(errors, key, []);
      } else useResetErrors(value);
    }
  });
}


export const useGetApiErrors = (localErrors: ApiErrors, apiErrors: ApiErrors) => {
  _forOwn(apiErrors, (value: string[], key: string) => {
    if (typeof value === 'object') _set(localErrors, key, value);
    else _set(localErrors, key, [value]);
  });
};


function notifyError(response: ApiBadResponse) {
  useNotify({
    message: response.message ?? 'Ocorreu um erro inesperado...',
    type: 'error'
  });
}

function notifySuccess(response: ApiGenericResponse) {
  if (response.message) {
    useNotify({
      message: response.message,
      type: 'success'
    });
  }
}

type useRequestParams<D, M extends object> = {
  apiFunction: ServiceCore<D, M>
  initialData?: any
  immediate?: boolean
  errorNotifyFunction?: (response: ApiBadResponse) => any
}

const useRequest = <D = any, M extends object = object>({
  apiFunction,
  initialData = null,
  errorNotifyFunction = notifyError
}: useRequestParams<D, M>) => {

  const data = ref<D>(initialData);
  const meta = ref<M>({} as M);
  const errors = ref<ApiErrors>({});
  const errorMessage = ref<string>('');
  const successMessage = ref<string>('');

  function apiCommunication(): ApiResponsePromise<D, M> {
    return new Promise((resolve, reject) => {
      errorMessage.value = '';
      successMessage.value = '';
      useResetErrors(errors.value);

      apiFunction()
        .then((response) => {
          if (response.message) successMessage.value = response.message;
          if (response.meta) meta.value = response.meta as UnwrapRef<M>;
          if (response.data !== undefined) data.value = response.data as UnwrapRef<D>;

          resolve(response);
        })
        .catch((response: ApiBadResponse) => {
          if (response) {
            if (response.message) errorMessage.value = response.message;
            if (response.data?.errors) useGetApiErrors(errors.value, response.data.errors);
            errorNotifyFunction(response);
          }

          reject(response);
        });
    });
  }

  return {
    data,
    meta,
    errors,
    messages: reactive({
      error: errorMessage,
      success: successMessage,
    }),
    request: apiCommunication,
  };
};

type useLoadingRequestParams<D, M extends object = object> = {
  multiple?: boolean
} & useRequestParams<D, M>;


export const useLoadingRequest = <D = any, M extends object = object>({
  apiFunction,
  initialData = null,
  immediate = true,
  multiple = false,
  errorNotifyFunction = notifyError
}: useLoadingRequestParams<D, M>) => {

  const { data, meta, errors, messages, request } = useRequest<D, M>({
    apiFunction,
    initialData,
    errorNotifyFunction,
    immediate: false,
  });

  const loading = ref<boolean>(false);

  function apiCommunication(useLoading: boolean = true): ApiResponsePromise<D, M> {
    return new Promise((resolve, reject) => {
      if (multiple || !loading.value) {
        if (useLoading) loading.value = true;

        request()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            loading.value = false;
          });
      } else {
        reject(
          new InternalHandledError('Impossível realizar a requisição, pois já existe uma requisição em andamento.')
        );
      }
    });
  }

  if (immediate) onMounted(apiCommunication);

  return {
    data,
    meta,
    errors,
    messages,
    loading,
    request: apiCommunication,
  };

};



type useFormRequestParams<D, M extends object> = {
  apiFunction: ServiceCore<D, M>,
  successNotifyFunction?: (response: ApiGenericResponse) => any,
  errorNotifyFunction?: (response: ApiBadResponse) => any
}

export const useFormRequest = <D = null, M extends object = object>({
  apiFunction,
  successNotifyFunction = notifySuccess,
  errorNotifyFunction = notifyError
}: useFormRequestParams<D, M>) => {

  const { data, meta, errors, messages, loading, request } = useLoadingRequest<D, M>({
    apiFunction,
    errorNotifyFunction,
    initialData: null,
    immediate: false
  });

  function apiCommunication(useLoading: boolean = true): ApiResponsePromise<D, M> {
    return new Promise((resolve, reject) => {
      request(useLoading)
        .then((response) => {
          successNotifyFunction(response);

          resolve(response);
        })
        .catch(reject);
    });
  }

  return {
    data,
    meta,
    errors,
    messages,
    loading,
    request: apiCommunication
  };
};



export type PaginatedMeta = {
  links: any[],
  current_page: string|number,
  per_page: string|number,
  last_page: string|number,
  total: string|number
};

type Pagination = {
  page: string | number;
  per_page: string | number;
  links?: any[];
  last_page?: string | number;
}


function getPagination(pagination: Pagination, meta: PaginatedMeta) {
  pagination.page = meta.current_page;
  pagination.last_page = meta.last_page;
  pagination.links = meta.links;
}


function useQuerySearchPagination<D = any>(
  request: ServiceCore<D, PaginatedMeta>,
  per_page: number | string = 10,
  name?: string
) {


  const route = useRoute();
  const router = useRouter();

  function getPaginationName(query: string): string {
    return name ? (name + '-' + query) : query;
  }


  const searchTimer = ref<NodeJS.Timeout>();

  const searchName = getPaginationName('search');

  const search = ref<object>(route.query[searchName] ? JSON.parse(route.query[searchName] as string) : {});


  const pageName = getPaginationName('page');

  const page = ref<number>(route.query[pageName] ? parseInt(route.query[pageName] as string) : 1);

  function changePage(_page: number): void {
    if (
      _page != page.value &&
      _page > 0 &&
      _page <= parseInt((pagination.value.last_page ?? 0) as string)
    ) page.value = _page;
  }

  const pagination = ref<Pagination>({
    page: page.value,
    per_page,
  });


  const queryWatchSource = ref(0);


  function forceSearch(): void {
    if (searchTimer.value) clearTimeout(searchTimer.value);
    page.value = 1;
    queryWatchSource.value++;
    request();
  }

  watch(search, () => {
    if (searchTimer.value) clearTimeout(searchTimer.value);

    searchTimer.value = setTimeout(() => {
      page.value = 1;
      request();
      queryWatchSource.value++;
    }, 1000);
  }, { deep: true });


  watch(page, (post, prev) => {
    if (post != prev) {
      request();
      queryWatchSource.value++;
    }
  });


  watch(queryWatchSource, () => {
    router.replace({
      query: {
        ...route.query,
        [pageName]: page.value,
        [searchName]: JSON.stringify(search.value)
      }
    });
  });


  return {
    page,
    search,
    pagination,
    forceSearch,
    changePage
  };

}



type usePaginatedRequestParams<D = any, M extends PaginatedMeta = any> = {
  apiFunction: ServiceCore<D, M>,
  errorNotifyFunction?: (response: ApiBadResponse) => any,
  perPage: number | string,
  immediate?: boolean,
  paginationName?: string,
}

export const usePaginatedRequest = <D = any, M extends PaginatedMeta = any>({
  apiFunction,
  perPage,
  paginationName,
  immediate = true,
  errorNotifyFunction = notifyError
}: usePaginatedRequestParams<D, M>) => {


  const {
    page,
    search,
    pagination,
    forceSearch,
    changePage
  } = useQuerySearchPagination(apiCommunication, perPage, paginationName);


  const {
    data,
    meta,
    errors,
    messages,
    loading,
    request
  } = useLoadingRequest<D, M>({
    apiFunction: () => apiFunction({
      ...pagination.value,
      ...search.value,
      page: page.value
    }),
    errorNotifyFunction,
    initialData: [],
    immediate: false
  });


  function apiCommunication(useLoading: boolean = true): ApiResponsePromise<D, M> {
    return new Promise((resolve, reject) => {
      request(useLoading)
        .then((response) => {
          if (response.meta) getPagination(pagination.value, response.meta);

          resolve(response);
        })
        .catch(reject);
    });
  }

  if (immediate) onMounted(apiCommunication);

  return {
    data,
    meta,
    errors,
    messages,
    loading,
    search,
    pagination,
    forceSearch,
    changePage,
    request: apiCommunication,
  };

};
