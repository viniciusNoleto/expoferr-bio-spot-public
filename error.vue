<template>
  <div class="h-screen w-screen center-flex flex-col bg-gradient-to-br from-primary-300 to-primary-700 gap-6">
    <span class="text-4xl text-white">
      Página com problemas :(
    </span>

    <ExpoButton
      to="/"
      label="Voltar para a página inicial"
      color="white-primary"
    />
  </div>
</template>

<script lang="ts" setup>

  import type { NuxtError } from '#app';

  const props = defineProps({
    error: {
      type: Object as () => NuxtError<any>,
      required: true,
    }
  });

  const router = useRouter();

  if (props.error.statusCode === 404) {

    if (router.options.history.state.back) await navigateTo(router.options.history.state.back as string);
    else await navigateTo('/');

    clearError();

    useNotify({
      message: `A página da rota ${props.error.data?.path ?? 'desconhecida'} não foi encontrada!`,
      type: 'warning',
    });

    throw new InternalHandledError('Página desconhecida');

  }

  const env = useEnv();

  useHead({
    title: `Problemas técnicos | ${env.APP_NAME}`
  });

</script>
