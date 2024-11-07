
export type GenericObject = Record<string|number, any>;

export type GenericFunction = (...args: any[]) => any;

export type ReactiveData<T = any> = (Ref<T>)|(() => T);
