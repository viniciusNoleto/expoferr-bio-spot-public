
function useExpoferrLaravelClientBase() {

  type HttpMethod = 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  type OneLevelRecord = Record<string, string | number | boolean>;


  const env = useEnv();

  const userStore = useUserStore();

  function getAuthorization(useToken: boolean): Record<string, any> {
    return useToken && userStore.token ? { Authorization: `Bearer ${userStore.token}` } : {};
  }

  function clearParams(params: Record<any, any>): OneLevelRecord {
    return _omitBy(params, (param) => !['string', 'number', 'boolean'].includes(typeof param));
  }

  type MakeRequestParams = {
    url: string;
    method: HttpMethod;
    body?: object;
    params?: object;
    version?: string;
    headers?: GenericObject;
    useToken?: boolean;
  };


  function makeRequest<D = any, M extends object = any>({
    url,
    method,
    body,
    params,
    headers = {},
    useToken = true,
    version = env.API_DEFAULT_VERSION,
  }: MakeRequestParams): ApiResponsePromise<D, M> {
    return new Promise((resolve, reject) => {
      $fetch(`${env.APP_API_URL}${version}/${url}`, {
        body,
        method,
        params: params ? clearParams(params) : undefined,
        headers: {
          ...getAuthorization(useToken),
          ...headers
        }
      })
      .then((response: any) => resolve(response))
      .catch((response) => {
        if (response.data) _set(response.data, 'status', response.status);

        reject(response.data);
      });
    });
  };



  type NoBodyFunctionParams = {
    url: string;
    params?: object;
    headers?: object;
    useToken?: boolean;
    version?: string;
  };

  type WithBodyFunctionParams = NoBodyFunctionParams & {
    body?: object;
  };


  function get<D = any, M extends object = any>({
    url,
    params,
    version,
    headers,
    useToken,
  }: NoBodyFunctionParams) {
    return makeRequest<D, M>({
      url,
      params,
      version,
      headers,
      useToken,
      method: 'GET',
    });
  };


  function post<D = any>({
    url,
    body = {},
    params,
    version,
    headers,
    useToken,
  }: WithBodyFunctionParams) {
    return makeRequest<D>({
      url,
      body,
      params,
      version,
      headers,
      useToken,
      method: 'POST',
    });
  };


  function put<D = any>({
    url,
    body = {},
    params,
    version,
    headers,
    useToken,
  }: WithBodyFunctionParams) {
    return makeRequest<D>({
      url,
      body,
      params,
      version,
      headers,
      useToken,
      method: 'PUT',
    });
  };


  function del<D = any>({
    url,
    params,
    version,
    headers,
    useToken,
  }: NoBodyFunctionParams) {
    return makeRequest<D>({
      url,
      params,
      version,
      headers,
      useToken,
      method: 'DELETE',
    });
  };


  return {
    get,
    post,
    put,
    delete: del
  };

}


const ExpoferrLaravelClient = ref<ReturnType<typeof useExpoferrLaravelClientBase>>();

export const useExpoferrLaravelClient = () => {
  if (!ExpoferrLaravelClient.value) ExpoferrLaravelClient.value = useExpoferrLaravelClientBase();
  return ExpoferrLaravelClient.value;
}
