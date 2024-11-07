
import { useExpoferrLaravelClient } from '~/clients/ExpoferrLaravelClient';
import {
  type IAuth
} from '~/app/auth/models/Auth';

export const useAuthRepository = defineRepository(useExpoferrLaravelClient, (client) => {

  const url = 'auth/';

  function login(body: object) {
    return client.post<IAuth>({
      url: url + 'login',
      useToken: false,
      body,
    });
  }

  return {
    login,
  };

});
