<template>
  <UtilsPageFrame
    :breadcrumbs="[
      { route: 'index', name: 'Início' },
      { route: 'complaint', name: 'Denúncias' },
    ]"
  >
    <UtilsCard>
      <UtilsTable
        title="Denúncias"
        :pagination="complaintsPagination"
        :loading="complaintsLoading"
        :data="complaints"
        :columns="[
          { field: 'id', label: 'ID' },
          { field: 'process_info.description', label: 'Descrição' },
          { field: 'status', label: 'Situação' },
        ]"
        @change-page="complaintsChangePage"
      >
        <template #functions>
          <ExpoButton
            to="/complaint/store"
            color="primary"
            padding="p-2"
            tooltip-text="Nova denúncia"
            :icon="GLOBAL_ICONS.store"
          />
        </template>

        <template #cell:status="{ item }">
          <div class="center-flex">
            <UtilsBadge
              :style="{
                backgroundColor: item.status.color + '4d',
              }"
            >
              {{ item.status.name }}
            </UtilsBadge>
          </div>
        </template>

        <template #actions="{ item }">
          <ExpoButton
            :to="`/complaint/${item.id}`"
            color="hover-primary"
            icon-class="text-lg"
            :icon="GLOBAL_ICONS.detail"
          />
        </template>
      </UtilsTable>
    </UtilsCard>
  </UtilsPageFrame>
</template>

<script setup>

  import { useGetComplaintsPaginatedRequestHandler } from '~/app/complaint/handlers/getComplaintsPaginatedRequestHandler';
  import { GLOBAL_ICONS } from '~/shared/packages/constants/icons';

  await definePage({
    title: 'Denúncias',
  });

  const {
    data: complaints,
    loading: complaintsLoading,
    changePage: complaintsChangePage,
    pagination: complaintsPagination,
  } = useGetComplaintsPaginatedRequestHandler({
    perPage: 10,
  });

</script>
