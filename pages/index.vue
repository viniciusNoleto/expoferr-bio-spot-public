<template>
  <section class="flex flex-col">
    <section class="grow grid grid-rows-[7fr_3fr] gap-5">
      <div
        :style="{
          backgroundImage: `url('${homeImg}')`,
        }"
        class="rounded-lg bg-center bg-cover flex flex-col overflow-hidden"
      >
        <div class="p-4 grow flex flex-col gap-2 justify-end bg-gradient-to-b from-transparent via-transparent to-black/85 to-70% font-semibold text-8xl leading-none">
          <span class="text-primary-200/50">
            Bio Spot,
          </span>

          <span class="text-white/50">
            Conectando órgãos e rastreando pragas!
          </span>
        </div>
      </div>

      <section class="responsive-flex gap-4">
        <NuxtLink
          v-for="link in [
            { to: '/complaint', label: 'Denúncias', icon: GLOBAL_ICONS.complaint },
            { to: '/suspect', label: 'Suspeitas', icon: GLOBAL_ICONS.suspect },
            { to: '/plague', label: 'Pragas', icon: GLOBAL_ICONS.plague },
          ]"
          :key="link.to"
          :to="link.to"
          class="h-fit"
        >
          <UtilsCard
            display="flex gap-2 items-center"
            class="border-primary-500 border relative hover:scale-105 transition-transform"
          >
            <div class="absolute top-2 right-2 center-flex">
              <Icon
                name="hugeicons:link-04"
                class="text-primary-500 text-3xl"
              />
            </div>

            <div class="center-flex p-3 bg-gray-500/15 rounded-full">
              <Icon
                :name="link.icon"
                class="text-primary-500 text-2xl"
              />
            </div>

            <span class="font-semibold underline decoration-2 decoration-primary-500">
              {{ link.label }}
            </span>
          </UtilsCard>
        </NuxtLink>
      </section>
    </section>
  </section>
</template>

<script setup>

  import { GLOBAL_ICONS } from '~/shared/packages/constants/icons';

  definePage({
    title: 'Início',
  });

  const img = useImage();

  const homeImg = computed(() => img('/home.jpg'));

</script>
