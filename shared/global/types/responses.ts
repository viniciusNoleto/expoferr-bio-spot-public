
export type ApiErrors = Record<string, string[]>

export interface ApiGenericResponse<D = any, M extends object = object> {
  message?: string;
  data: D;
  meta?: M;
  [key: string]: any
};

export interface ApiBadResponse extends ApiGenericResponse {
  data: {
    errors: ApiErrors
  },
  status: number
};

export type ApiResponsePromise<D = any, M extends object = object> = Promise<ApiGenericResponse<D, M>>;
