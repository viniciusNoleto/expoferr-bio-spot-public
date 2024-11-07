
import { useAuthRepository } from '~/app/auth/repositories/authRepository';

export const useLoginService = defineService(() => {
  const { login } = useAuthRepository();

  const userStore = useUserStore();

  async function loginService(form: any) {
    return await login(form).then(useCallAndReturn((response) => {
      userStore.setToken(response.data.access_token);
      userStore.setUser({
        name: response.data.name,
        email: response.data.abilities
      });

      navigateTo('/');
    }));
  }

  return {
    loginService
  };
});
