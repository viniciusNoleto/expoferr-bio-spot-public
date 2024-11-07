<template>
  <UtilsPageFrame
    :breadcrumbs="[
      { route: 'index', name: 'Início' },
      { route: 'plague', name: 'Pragas' },
    ]"
  >
    <UtilsCard>
      <UtilsTable
        title="Pragas"
        :pagination="plaguesPagination"
        :loading="plaguesLoading"
        :data="plagues"
        :columns="[
          { field: 'id', label: 'ID' },
          { field: 'name', label: 'Praga' },
          { field: 'description', label: 'Descrição' },
          { field: 'status', label: 'Situação' },
        ]"
        @change-page="plaguesChangePage"
      >
        <template #functions>
          <ExpoButton
            to="/plague/store"
            color="primary"
            padding="p-2"
            tooltip-text="Nova praga"
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
            :to="`/plague/${item.id}`"
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

  import { useGetPlaguesPaginatedRequestHandler } from '~/app/plague/handlers/getPlaguesPaginatedRequestHandler';
  import { GLOBAL_ICONS } from '~/shared/packages/constants/icons';

  definePage({
    title: 'Pragas',
  });

  const {
    data: plagues,
    loading: plaguesLoading,
    changePage: plaguesChangePage,
    pagination: plaguesPagination,
  } = useGetPlaguesPaginatedRequestHandler({
    perPage: 10,
  });

</script>
