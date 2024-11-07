
export const useReactiveData = <T = any>(parameter: ReactiveData<T>): T => {
  return typeof parameter === 'function' ? parameter() : parameter.value;
}

export const useConvertNoPrimitivesToJSON = <O extends Record<string|number, any>>(obj: O) => {
  return _mapValues(obj, value => {
    if (value == null || typeof value === 'function') return null;
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
  });
}
