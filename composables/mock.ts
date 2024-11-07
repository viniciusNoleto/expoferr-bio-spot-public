
type useServiceMockParams<D, M> = {
  data: D;
  good?: boolean;
  meta?: M;
};

export const useServiceMock = <D extends Array<object> | object = any, M extends object = object>(
  {
    data,
    good = true,
    meta = {} as M
  }: useServiceMockParams<D, M>
): ServiceCore<D> => {

  return () => new Promise((resolve, reject) => {
    (good ? resolve : reject)({
      data,
      meta
    });
  });

}
