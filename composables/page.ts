

type PageParams = {
  title: string;
};

export const definePage = async ({
  title,
}: PageParams) => {

  onMounted(() => {

    useHead({
      title
    });

  });

};
