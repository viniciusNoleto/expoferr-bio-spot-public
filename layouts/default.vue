<template>
  <section class="flex flex-col">
    <HomeHeader />

    <main class="grow flex flex-col *:grow">
      <slot />
    </main>
  </section>
</template>

<script lang="ts" setup>

  const nuxtApp = useNuxtApp();

  const env = useEnv();

  const loading = ref(false);

  nuxtApp.hook('page:start', () => {
    loading.value = true;
  });

  nuxtApp.hook('page:finish', () => {
    loading.value = false;
  });

  onErrorCaptured((e) => {
    if (e instanceof Error) {
      if (e instanceof InternalHandledError) return false;

      if (env.APP_ENV === 'local') {
        // eslint-disable-next-line no-console
        console.error(e);
      }

      useNotify({
        type: 'error',
        message: 'Ocorreu um erro fatal na tela. Por favor, tente novamente mais tarde.'
      });

      if (e instanceof SafeSpaceError) return false;

      navigateToPrevious('/');
    }

    return false;
  });
</script>
