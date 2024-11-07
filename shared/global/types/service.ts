
export type ServiceCore<D = any, M extends object = object, Args extends any[] = any[]> = (...args: Args) => ApiResponsePromise<D, M>;

export type Service<T extends Record<string, ServiceCore> = Record<string, ServiceCore>> = T;

type ServiceReturn<C extends () => Service, S extends string> = C extends () => Record<S, infer T> ? T : never;

export type ServiceReturnParameters<C extends () => Service, S extends string> = Parameters<ServiceReturn<C, S>>;
