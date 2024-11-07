
import { useStoreComplaintService } from '~/app/complaint/services/storeComplaintService';

export const useStoreComplaintFormRequestHandler = defineHandler((
  form: ReactiveData<object>,
  config: RequestParameters<typeof useFormRequest> = {}
) => {

  const { storeComplaintService } = useStoreComplaintService();

  return useFormRequest({
    ...config,
    apiFunction: () => storeComplaintService(
      useReactiveData(form),
    ),
  });

});
