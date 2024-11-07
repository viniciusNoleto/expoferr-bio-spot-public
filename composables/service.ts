
export const defineService = <T extends Record<string, ServiceCore>>(
  service: () => Service<T>
): (() => Service<T>) => {
  return service;
};
