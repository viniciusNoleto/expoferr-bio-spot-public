
export const defineHandler = <R extends object, Args extends any[] = any[]>(
  handler: (...args: Args) => Hanlder<R>
) => {
  return handler;
};
