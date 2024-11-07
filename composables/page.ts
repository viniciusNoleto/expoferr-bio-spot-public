

type PageParams = {
  title: string;
  security_type?: 'public' | 'private' | 'both';
};

export const definePage = async ({
  title,
  security_type = 'private'
}: PageParams) => {

  const route = useRoute();

  const userStore = useUserStore();

  if (!userStore.isLogged) {

    if (security_type === 'private') {
      await navigateTo('/auth/login');

      if (route.name !== 'index') {
          useNotify({
          message: 'Você precisa estar conectado para acessar esta página.',
          type: 'warning'
        });
      }

      throw new PageLogicError('Usuário não logado.');
    }

  } else if (security_type === 'public') {
    await navigateTo('/');

    useNotify({
      message: 'Você já está conectado, desconecte-se para acessar esta página.',
      type: 'warning'
    });

    throw new PageLogicError('Usuário logado tentando acessar página pública.');
  }

  onMounted(() => {

    useHead({
      title
    });

  });

};
