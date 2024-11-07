<template>
  <UtilsPageFrame
    :breadcrumbs="[
      { route: 'index', name: 'Início' },
      { route: 'complaint', name: 'Denúncias' },
      { route: 'complaint-complaint_id', name: 'Denúncia' },
    ]"
  >
    <UtilsCard class="gap-10">
      <template v-if="complaintLoading">
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
              Denúncia #{{ complaint.id }}
            </span>

            <span class="text-sm font-medium">
              {{ Formatter.date(complaint.started_at) }}
            </span>
          </div>

          <div class="center-flex">
            <UtilsBadge
              :style="{
                backgroundColor: complaint.status.color + '4d',
              }"
              class="text-sm"
            >
              {{ complaint.status.name }}
            </UtilsBadge>
          </div>
        </div>

        <span>
          {{ complaint.process_info.description }}
        </span>

        <div
          v-if="complaint.actions === 'executor' && complaint.status.slug === 'pending'"
          class="center-flex gap-6"
        >
          <ExpoButton
            label="Descartar denúncia"
            color="red"
            @action="modals.discard = true"
          />

          <ExpoButton
            label="Confirmar denúncia"
            color="primary"
            @action="modals.confirm = true"
          />
        </div>
      </template>
    </UtilsCard>

    <UtilsModal
      v-if="modals.confirm"
      v-model:visible="modals.confirm"
      title="Confirmar denúncia"
      class="gap-6 py-2"
      size="max-w-xl"
    >
      <ExpoInputFrame
        label="Anotações"
      >
        <ExpoInputTextarea
          v-model="confirmComplaintForm.notes"
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
          :loading="confirmComplaintLoading"
          @action="confirmComplaint"
        />
      </div>
    </UtilsModal>

    <UtilsModal
      v-if="modals.discard"
      v-model:visible="modals.discard"
      title="Descartar denúncia"
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
          :loading="discardComplaintLoading"
          @action="discardComplaint"
        />
      </div>
    </UtilsModal>
  </UtilsPageFrame>
</template>

<script setup>

  import { useGetComplaintLoadingRequestHandler } from '~/app/complaint/handlers/getComplaintLoadingRequestHandler';
  import { useConfirmComplaintFormRequestHandler } from '~/app/complaint/handlers/confirmComplaintFormRequestHandler';
  import { useDiscardComplaintFormRequestHandler } from '~/app/complaint/handlers/discardComplaintFormRequestHandler';

  await definePage({
    title: 'Denúncia',
  });

  const route = useRoute();

  const {
    data: complaint,
    loading: complaintLoading,
    request: getComplaintRequest,
  } = useGetComplaintLoadingRequestHandler(
    () => route.params.complaint_id,
    {
      immediate: false
    }
  );

  await defineSafeSpace(
    getComplaintRequest,
    () => navigateToPrevious('/complaint')
  );

  const modals = ref({
    confirm: null,
    discard: null,
  });

  const confirmComplaintForm = ref({
    notes: undefined
  });

  const {
    request: confirmComplaintRequest,
    loading: confirmComplaintLoading,
  } = useConfirmComplaintFormRequestHandler(
    () => route.params.complaint_id,
    confirmComplaintForm
  );

  async function confirmComplaint() {
    await confirmComplaintRequest().then(() => {
      getComplaintRequest();
      modals.value.confirm = false;
    });
  } 

  const {
    request: discardComplaintRequest,
    loading: discardComplaintLoading,
  } = useDiscardComplaintFormRequestHandler(
    () => route.params.complaint_id
  );

  async function discardComplaint() {
    await discardComplaintRequest().then(() => {
      getComplaintRequest();
      modals.value.discard = false;
    });
  }

</script>
