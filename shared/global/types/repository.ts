
export type RepositoryCore<T = any, Args extends any[] = any[]> = (...args: Args) => ApiResponsePromise<T>;

export type Repository<T extends Record<string, RepositoryCore>> = T;
