<template>
  <aside class="bg-zinc-50 flex flex-col shadow-lg">
    <div class="center-flex gap-1.5 p-4">
      <NuxtImg
        src="/logo.png"
        class="h-10"
      />

      <h1 class="text-lg font-bold text-primary-500">
        {{ env.APP_NAME }}
      </h1>
    </div>

    <hr>

    <div class="flex flex-col gap-2 p-2.5 grow">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-1.5 p-2 rounded-lg text-sm transition-all"
        :class="{
          'hover:ring ring-primary-500/25 bg-primary-500 text-white': route.name.split('-')[0] === link.route,
          'hover:bg-primary-500/60 hover:text-white': route.name.split('-')[0] !== link.route,
        }"
      >
        <Icon
          :name="link.icon"
        />

        {{ link.label }}
      </NuxtLink>
    </div>

    <div class="flex items-center p-2.5 gap-2">
      <div class="center-flex p-3 rounded-full bg-gray-500/15 shadow-lg">
        <Icon
          name="uim:head-side-mask"
          class="text-primary-500 text-2xl"
        />
      </div>

      <span class="text-sm font-semibold grow">
        {{ userStore.user?.name }}
      </span>

      <ExpoButton
        icon="material-symbols:arrow-forward-ios-rounded"
        icon-class="text-xl"
        color="hover-primary"
        tooltip-text="sair"
        @action="userStore.logout"
      />
    </div>
  </aside>
</template>

<script setup>

  import { GLOBAL_ICONS } from '~/shared/packages/constants/icons';

  const route = useRoute();

  const userStore = useUserStore();

  const env = useEnv();

  const links = [
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
    },
    {
      label: 'Suspeitas',
      to: '/suspect',
      route: 'suspect',
      icon: GLOBAL_ICONS.suspect,
    },
    {
      label: 'Pragas',
      to: '/plague',
      route: 'plague',
      icon: GLOBAL_ICONS.plague,
    },
  ];

</script>
