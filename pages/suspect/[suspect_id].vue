<template>
  <UtilsPageFrame
    :breadcrumbs="[
      { route: 'index', name: 'Início' },
      { route: 'suspect', name: 'Suspeitas' },
      { route: 'suspect-suspect_id', name: 'Suspeita' },
    ]"
  >
    <UtilsCard class="gap-10">
      <template v-if="suspectLoading">
        <div class="flex flex-col gap-1">
          <UtilsSkeleton width="6rem" height="1rem" />

          <UtilsSkeleton width="4rem" height="0.5rem" />
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
              Suspeita #{{ suspect.id }}
            </span>
          </div>

          <div class="center-flex">
            <UtilsBadge
              :style="{
                backgroundColor: suspect.status.color + '4d',
              }"
              class="text-sm"
            >
              {{ suspect.status.name }}
            </UtilsBadge>
          </div>
        </div>

        <span>
          {{ suspect.process_info.description }}
        </span>

        <div
          v-if="suspect.actions === 'executor' && suspect.status.slug === 'pending'"
          class="center-flex gap-6"
        >
          <ExpoButton
            label="Descartar suspeita"
            color="red"
            @action="modals.discard = true"
          />

          <ExpoButton
            label="Confirmar suspeita"
            color="primary"
            @action="modals.confirm = true"
          />
        </div>
      </template>
    </UtilsCard>

    <UtilsModal
      v-if="modals.confirm"
      v-model:visible="modals.confirm"
      title="Confirmar suspeita"
      class="gap-6 py-2"
      size="max-w-xl"
    >
      <ExpoInputFrame
        label="Anotações"
      >
        <ExpoInputTextarea
          v-model="confirmSuspectForm.notes"
        />
      </ExpoInputFrame>

      <ExpoInputFrame
        label="Tipo de praga"
      >
        <ExpoInputSelect
          v-model="confirmSuspectForm.plague_type_id"
          placeholder="Selecione um tipo de praga"
          :options="plagueTypes"
          :loading="plagueTypesLoading"
          option-value="id"
          option-label="name"
        />
      </ExpoInputFrame>

      <div class="center-flex gap-4">
        <ExpoButton
          label="Fechar"
          color="gray"
          @action="modals.confirm = false"
        />

        <ExpoButton
          label="Confirmar"
          color="primary"
          :loading="confirmSuspectLoading"
          @action="confirmSuspect"
        />
      </div>
    </UtilsModal>

    <UtilsModal
      v-if="modals.discard"
      v-model:visible="modals.discard"
      title="Descartar suspeita"
      class="gap-6 py-2"
      size="max-w-sm"
    >
      <div class="center-flex gap-4">
        <ExpoButton
          label="Fechar"
          color="gray"
          @action="modals.discard = false"
        />

        <ExpoButton
          label="Confirmar"
          color="red"
          :loading="discardSuspectLoading"
          @action="discardSuspect"
        />
      </div>
    </UtilsModal>
  </UtilsPageFrame>
</template>

<script setup>

  import { useGetSuspectLoadingRequestHandler } from '~/app/suspect/handlers/getSuspectLoadingRequestHandler';
  import { useConfirmSuspectFormRequestHandler } from '~/app/suspect/handlers/confirmSuspectFormRequestHandler';
  import { useDiscardSuspectFormRequestHandler } from '~/app/suspect/handlers/discardSuspectFormRequestHandler';
  import { useGetPlagueTypesLoadingRequestHandler } from '~/app/plague/handlers/getPlagueTypesLoadingRequestHandler';

  definePage({
    title: 'Suspeita',
  });

  const route = useRoute();

  const {
    data: suspect,
    loading: suspectLoading,
    request: getSuspectRequest,
  } = useGetSuspectLoadingRequestHandler(
    () => route.params.suspect_id,
    {
      immediate: false
    }
  );

  await defineSafeSpace(
    getSuspectRequest,
    () => navigateToPrevious('/suspect')
  );

  const {
    data: plagueTypes,
    loading: plagueTypesLoading
  } = useGetPlagueTypesLoadingRequestHandler();

  const modals = ref({
    confirm: null,
    discard: null,
  });

  const confirmSuspectForm = ref({
    plague_type_id: undefined,
    notes: undefined,
  });

  const {
    request: confirmSuspectRequest,
    loading: confirmSuspectLoading
  } = useConfirmSuspectFormRequestHandler(
    () => route.params.suspect_id,
    confirmSuspectForm
  );

  async function confirmSuspect() {
    await confirmSuspectRequest().then(() => {
      getSuspectRequest();
      modals.value.confirm = false;
    });
  }

  const {
    request: discardSuspectRequest,
    loading: discardSuspectLoading
  } = useDiscardSuspectFormRequestHandler(
    () => route.params.suspect_id
  );

  async function discardSuspect() {
    await discardSuspectRequest().then(() => {
      getSuspectRequest();
      modals.value.discard = false;
    });
  }

</script>
