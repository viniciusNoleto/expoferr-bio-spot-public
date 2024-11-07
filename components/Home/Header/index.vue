<template>
  <header class="flex justify-between gap-4 shadow-lg bg-white border-b border-primary-500 p-5">
    <div class="flex items-center gap-4">
      <NuxtLink to="/">
        <NuxtImg
          src="/logo.png"
          class="h-12"
        />
      </NuxtLink>

      <h1 class="text-2xl font-bold text-primary-500">
        {{ env.APP_NAME}}
      </h1>
    </div>

    <nav class="flex gap-4">
      <ExpoButton
        v-for="link in filteredLinks"
        :key="link.to"
        :to="link.to"
        :label="link.label"
        :icon="link.icon"
        icon-class="text-xl"
        gap="gap-3"
        color="primary"
      />
    </nav>
  </header>
</template>

<script setup>

  import { GLOBAL_ICONS } from '~/shared/packages/constants/icons';

  const userStore = useUserStore();

  const env = useEnv();

  const links = ref([
    {
      label: 'Início',
      to: '/',
      route: 'index',
      icon: GLOBAL_ICONS.index,
    },
    {
      label: 'Denúncias',
      to: '/complaint',
      route: 'complaint',
      icon: GLOBAL_ICONS.complaint,
      condition: () => userStore.isLogged,
    },
    {
      label: 'Login',
      to: '/auth/login',
      route: 'auth-login',
      icon: 'material-symbols:person-rounded',
      condition: () => !userStore.isLogged,
    },
  ]);

  const filteredLinks = computed(() => links.value.filter(link => !link.condition || link.condition()));

</script>
