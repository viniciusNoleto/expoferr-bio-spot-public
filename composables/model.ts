type UncertainType<N, T> = N extends null ? T | null : T;

export const useSingleInstantiator = <M, I, Args extends any[]>(
  repositoryFunction: RepositoryCore<I, Args>,
  constructor: ModelConstructor<any, M>
) => {
  return (async (...args: Args) => {
    return await repositoryFunction(...args).then((response) => {
      if (response.data) (response.data as any) = new constructor(response.data as any);

      return response;
    });
  }) as RepositoryCore<UncertainType<I, M>, Args>;
};

export const useMultipleInstantiator = <M, I, Args extends any[]>(
  repositoryFunction: RepositoryCore<I[], Args>,
  constructor: ModelConstructor<any, M>
) => {
  return (async (...args: Args) => {
    return await repositoryFunction(...args).then((response) => {
      if (response.data) (response.data as any) = response.data.map((item) => new constructor(item as any));

      return response;
    });
  }) as RepositoryCore<UncertainType<I, M[]>, Args>;
};
