
import type { defineStore } from 'pinia';

export const useDestructibleStore = <S extends ReturnType<ReturnType<typeof defineStore>>>(store: S) => {

  const destructible = toRefs(store);

  return Object.keys(destructible).reduce((acc, key) => {

    // @ts-ignore
    if (typeof destructible[key].value === 'function') acc[key] = destructible[key].value;
    // @ts-ignore
    else acc[key] = destructible[key];

    return acc;
  }, {}) as {
    [K in keyof typeof destructible]: typeof destructible[K] extends Ref<GenericFunction>
      ? typeof destructible[K]['value']
      : typeof destructible[K];
  };

};
