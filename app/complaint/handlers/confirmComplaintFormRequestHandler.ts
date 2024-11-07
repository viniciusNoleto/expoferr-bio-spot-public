
import { useConfirmComplaintService } from '~/app/complaint/services/confirmComplaintService';

export const useConfirmComplaintFormRequestHandler = defineHandler((
  complaint_id: ReactiveData<string|number>,
  form: ReactiveData<object>,
  config: RequestParameters<typeof useFormRequest> = {}
) => {

  const { confirmComplaintService } = useConfirmComplaintService();

  return useFormRequest({
    ...config,
    apiFunction: () => confirmComplaintService(
      useReactiveData(complaint_id),
      useReactiveData(form),
    ),
  });

});
