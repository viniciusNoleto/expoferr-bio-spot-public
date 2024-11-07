
export const navigateToPrevious = async (fallback: string) => {
  const back = useRouter().options.history.state.back;

  if (back && typeof back === 'string') return await navigateTo(back);

  await navigateTo(fallback);
};

export const navigateToReload = async () => {
  const route = useRoute();

  await useRouter().push({
    query: {
      fr: route.query.fr ? Number(route.query.fr) + 1 : 1
    }
  });
};
