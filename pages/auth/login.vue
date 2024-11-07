<template>
  <UtilsCard
    class="max-w-xl w-full mx-4 border border-primary-500/50 gap-6"
    padding="p-6"
    @keyup.enter="login"
  >
    <div class="center-flex flex-col gap-3">
      <NuxtImg
        src="/logo.png"
        class="h-16"
      />

      <h1 class="text-2xl font-bold text-primary-500">
        Bio Spot
      </h1>
    </div>

    <ExpoInputFrame
      label="Email"
    >
      <ExpoInputDefault
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="Digite seu email"
      />
    </ExpoInputFrame>

    <ExpoInputFrame
      label="Senha"
    >
      <ExpoInputDefault
        v-model="form.password"
        placeholder="Digite sua senha"
        type="password"
      />
    </ExpoInputFrame>

    <ExpoButton
      label="Entrar"
      color="primary"
      :loading="loginLoading"
      @action="login"
    />
  </UtilsCard>
</template>

<script setup>

  import { useLoginFormRequestHandler } from '~/app/auth/handlers/loginFormRequestHandler';

  definePageMeta({
    layout: 'auth',
  });

  const form = ref({
    cpf: '',
    password: '',
  });

  const {
    loading: loginLoading,
    request: login
  } = useLoginFormRequestHandler(form);

</script>
