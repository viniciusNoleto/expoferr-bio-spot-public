<template>
  <div class="flex flex-row items-center gap-2 text-sm text-gray-500/50">
    <template v-for="(breadcrumb, idx) in breadcrumbs" :key="idx">
      <NuxtLink
        class="flex flex-row items-center gap-1"
        :class="idx === breadcrumbs.length - 1 ? 'text-primary-600 decoration-primary-600 font-semibold' : 'hover:underline'"
        :to="idx === breadcrumbs.length - 1 ? undefined : breadcrumb.path"
      >
        <Icon
          :name="breadcrumb.icon"
          class="text-md"
        />

        {{ breadcrumb.name }}
      </NuxtLink>

      <Icon
        v-if="idx !== breadcrumbs.length-1"
        name="material-symbols:arrow-forward-ios-rounded"
        class="font-bold"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>

  type Breadcrumb = {
    icon: string;
    path: string;
    name: string;
  };

  defineProps({
    breadcrumbs: {
      type: Array as PropType<Breadcrumb[]>,
      default: () => [],
    }
  });

</script>
