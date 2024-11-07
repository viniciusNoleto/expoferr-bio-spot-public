
type ClientFunction<Args extends any[] = any[]> = <D = any>(...args: Args) => ApiResponsePromise<D>;

export interface IClient {
  get: ClientFunction,
  post: ClientFunction,
  put: ClientFunction,
  delete: ClientFunction,
}
