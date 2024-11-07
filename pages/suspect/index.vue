<template>
  <UtilsPageFrame
    :breadcrumbs="[
      { route: 'index', name: 'Início' },
      { route: 'suspect', name: 'Suspeitas' },
    ]"
  >
    <UtilsCard>
      <UtilsTable
        title="Suspeitas"
        :pagination="suspectsPagination"
        :loading="suspectsLoading"
        :data="suspects"
        :columns="[
          { field: 'id', label: 'ID' },
          { field: 'process_info.description', label: 'Descrição' },
          { field: 'status', label: 'Situação' },
        ]"
        @change-page="suspectsChangePage"
      >
        <template #functions>
          <ExpoButton
            to="/suspect/store"
            color="primary"
            padding="p-2"
            tooltip-text="Nova suspeita"
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
            :to="`/suspect/${item.id}`"
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

  import { useGetSuspectsPaginatedRequestHandler } from '~/app/suspect/handlers/getSuspectsPaginatedRequestHandler';
  import { GLOBAL_ICONS } from '~/shared/packages/constants/icons';

  definePage({
    title: 'Suspeitas',
  });

  const {
    data: suspects,
    loading: suspectsLoading,
    changePage: suspectsChangePage,
    pagination: suspectsPagination,
  } = useGetSuspectsPaginatedRequestHandler({
    perPage: 10,
  });

</script>
