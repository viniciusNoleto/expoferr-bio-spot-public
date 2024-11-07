
import { useDiscardComplaintService } from '~/app/complaint/services/discardComplaintService';

export const useDiscardComplaintFormRequestHandler = defineHandler((
  complaint_id: ReactiveData<string|number>,
  config: RequestParameters<typeof useFormRequest> = {}
) => {

  const { discardComplaintService } = useDiscardComplaintService();

  return useFormRequest({
    ...config,
    apiFunction: () => discardComplaintService(
      useReactiveData(complaint_id),
    ),
  });

});
