<template>
  <section class="flex flex-col gap-8">
    <div class="flex flex-col gap-1">
      <h2 class="text-3xl font-bold text-primary-900 dark:text-primary-50">
        {{ title || breadcrumbs[breadcrumbs.length - 1]?.name }}
      </h2>

      <UtilsBreadcrumb :breadcrumbs="breadcrumbs" />
    </div>

    <slot />
  </section>
</template>

<script lang="ts" setup>

  import { GLOBAL_ICONS, ERROR_ICON } from '~/shared/packages/constants/icons';


  type Breadcrumb = {
    icon?: string;
    route: string;
    name: string;
  };

  const props = defineProps({
    breadcrumbs: {
      type: Array as PropType<Breadcrumb[]>,
      default: () => [],
    },
    title: {
      type: String,
      default: undefined,
    },
  });

  const router = useRouter();

  const breadcrumbs = computed(() => {
    return props.breadcrumbs.map((breadcrumb) => {
      try {
        const route = router.resolve({ name: breadcrumb.route, params: router.currentRoute.value.params });

        if (!route) return undefined;

        return {
          // @ts-ignore
          icon: breadcrumb.icon || GLOBAL_ICONS[_last((route.name ?? '').split('-'))] || ERROR_ICON,
          name: breadcrumb.name,
          path: route.path,
        };
      } catch (e) {
        return undefined;
      }
    }).filter(breadcrumb => !!breadcrumb);
  })

</script>
