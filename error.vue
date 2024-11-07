<template>
  <SvgError class="max-h-[80vh]" />
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
