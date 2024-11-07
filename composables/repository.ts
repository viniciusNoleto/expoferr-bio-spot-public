
export const defineRepository = <R extends Record<string, RepositoryCore>, C extends IClient>(
  client: () => C,
  repository: (client: C) => Repository<R>
) => {
  return () => repository(client());
};
