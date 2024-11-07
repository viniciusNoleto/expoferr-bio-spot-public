
import { useGetComplaintService } from '~/app/complaint/services/getComplaintService';

export const useGetComplaintLoadingRequestHandler = defineHandler((
  complaint_id: ReactiveData<string|number>,
  config: RequestParameters<typeof useLoadingRequest> = {}
) => {

  const { getComplaintService } = useGetComplaintService();

  return useLoadingRequest({
    initialData: [],
    ...config,
    apiFunction: () => getComplaintService(
      useReactiveData(complaint_id)
    ),
  });

});
