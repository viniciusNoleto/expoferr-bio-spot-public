<template>
  <UtilsPageFrame
    :breadcrumbs="[
      { route: 'index', name: 'Início' },
      { route: 'plague', name: 'Suspeitas' },
      { route: 'plague-plague_id', name: 'Suspeita' },
    ]"
  >
    <UtilsCard class="gap-10">
      <template v-if="plagueLoading">
        <div class="flex flex-col gap-1">
          <UtilsSkeleton
            width="6rem"
            height="1rem"
          />

          <UtilsSkeleton
            width="4rem"
            height="0.5rem"
          />
        </div>
        
        <div class="flex flex-col gap-2">
          <UtilsSkeleton
            v-for="i in 5"
            :key="i"
            height="0.75rem"
          />
        </div>
      </template>

      <template v-else>
        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-1">
            <span class="font-semibold text-primary-700">
              Suspeita #{{ plague.id }}
            </span>
          </div>

          <div class="center-flex gap-4">
            <UtilsBadge
              class="text-sm bg-primary-500/30"
            >
              {{ plague.name }}
            </UtilsBadge>

            <UtilsBadge
              :style="{
                backgroundColor: plague.status.color + '4d',
              }"
              class="text-sm"
            >
              {{ plague.status.name }}
            </UtilsBadge>
          </div>
        </div>

        <span class="text-sm">
          {{ plague.description }}
        </span>

        <div
          v-if="plague.actions === 'executor' && plague.status.slug === 'active'"
          class="center-flex gap-6"
        >
          <ExpoButton
            label="Resolver praga"
            color="primary"
            :loading="resolvePlagueLoading"
            @action="resolvePlague"
          />
        </div>
      </template>
    </UtilsCard>
  </UtilsPageFrame>
</template>

<script setup>

  import { useGetPlagueLoadingRequestHandler } from '~/app/plague/handlers/getPlagueLoadingRequestHandler';
  import { useResolvePlagueFormRequestHandler } from '~/app/plague/handlers/resolvePlagueFormRequestHandler';

  definePage({
    title: 'Praga',
  });

  const route = useRoute();

  const {
    data: plague,
    loading: plagueLoading,
    request: getPlagueRequest,
  } = useGetPlagueLoadingRequestHandler(
    () => route.params.plague_id,
    {
      immediate: false
    }
  );

  await defineSafeSpace(
    getPlagueRequest,
    () => navigateToPrevious('/plague')
  );


  const {
    request: resolvePlagueRequest,
    loading: resolvePlagueLoading,
  } = useResolvePlagueFormRequestHandler(
    () => route.params.plague_id,
  );

  async function resolvePlague() {
    await resolvePlagueRequest().then(() => {
      getPlagueRequest();
    });
  }

</script>
