
export type RequestParameters<R extends ((...args: any[]) => any)> = Omit<Parameters<R>[0], 'apiFunction'>;

export type RequestAditionalParamsParameter = {
  aditionalParams?: ReactiveData<Record<string, string|number|boolean>>;
}

export type PaginatedRequestParameters = RequestParameters<typeof usePaginatedRequest> & RequestAditionalParamsParameter;
