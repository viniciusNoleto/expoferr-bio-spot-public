
import { useLoginService } from '~/app/auth/services/loginService';

export const useLoginFormRequestHandler = defineHandler((
  form: ReactiveData<object>,
  config: RequestParameters<typeof useFormRequest> = {}
) => {

  const { loginService } = useLoginService();

  return useFormRequest({
    ...config,
    apiFunction: () => loginService(useReactiveData(form))
  });

});
