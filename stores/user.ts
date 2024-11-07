import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', () => {

  const user = ref();

  function setUser(_user: any) {
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

  return {
    user,
    setUser,
    token,
    setToken,
    logout
  }

});
