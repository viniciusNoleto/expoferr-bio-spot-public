
import { useGetComplaintsService } from '~/app/complaint/services/getComplaintsService';

export const useGetComplaintsPaginatedRequestHandler = defineHandler((
  {
    aditionalParams,
    ...config
  }: PaginatedRequestParameters
) => {

  const { getComplaintsService } = useGetComplaintsService();

  return usePaginatedRequest({
    ...config,
    apiFunction: (params) => getComplaintsService(
      _merge(
        params,
        aditionalParams ? useReactiveData(aditionalParams) : {}
      )
    ),
  });

});
