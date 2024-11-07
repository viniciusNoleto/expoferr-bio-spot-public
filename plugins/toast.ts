
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {

  nuxtApp.vueApp.use(Vue3Toastify, {
    theme: 'auto',
    type: 'info',
    autoClose: 4000,
    transition: 'flip',
    dangerouslyHTMLString: true,
    clearOnUrlChange: false,
  } as ToastContainerOptions);

});
