import { defineStore } from 'pinia';
import type { IAuth } from '~/app/auth/models/Auth';

export const useUserStore = defineStore('User', () => {

  type User = Omit<IAuth, 'access_token'>;

  const user = ref<User>();

  function setUser(_user: User) {
    user.value = _user;
  };

  const token = ref();

  function setToken(_token: any) {
    token.value = _token;
  };

  function logout() {
    user.value = undefined;
    token.value = undefined;

    navigateTo('/auth/login');
  }

  const isLogged = computed(() => !!user.value && !!token.value);

  return {
    user,
    setUser,
    token,
    setToken,
    logout,
    isLogged
  }

});
