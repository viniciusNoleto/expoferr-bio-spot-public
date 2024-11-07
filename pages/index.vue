<template>
  <section class="flex flex-col gap-8 p-4">
    <div
      :style="{
        backgroundImage: `url('${homeImg}')`,
      }"
      class="rounded-lg bg-center bg-cover flex flex-col overflow-hidden min-h-[70vh]"
    >
      <div class="p-4 grow flex flex-col gap-2 justify-end bg-gradient-to-b from-transparent via-transparent to-black/85 to-70% font-semibold text-8xl leading-none">
        <span class="text-primary-200/50">
          Bio Spot,
        </span>

        <span class="text-white/50">
          Conectando órgãos e rastreando pragas!
        </span>
      </div>
    </div>

    <section class="flex flex-col gap-5 w-[80%] mx-auto mb-8">
      <div
        v-for="info in [
          {
            title: 'Sobre a Agro Sentinelas',
            body: 'A Agro Sentinelas conta com profissionais experientes em desenvolvimento de software, análise de dados e controle ambiental. A equipe domina tecnologias como Flutter, PHP, Vue.js e Power BI, e possui ampla vivência em fiscalização ambiental.'
          },
          {
            title: 'Objetivo',
            body: 'O BioSpot visa integrar a gestão pública para monitorar, notificar e alertar sobre pragas agrícolas, promovendo uma ação colaborativa entre população, fiscais e especialistas.'
          },
          {
            title: 'Problema',
            body: 'A fiscalização de pragas agrícolas é um desafio para os órgãos públicos, que muitas vezes não conseguem monitorar e notificar a população sobre pragas, e para a população, que não tem um canal eficiente para reportar pragas.'
          },
          {
            title: 'Como funciona',
            body: 'O BioSpot é uma plataforma web e mobile que permite a população reportar pragas agrícolas, fiscais monitorar e notificar a população sobre pragas, e especialistas analisar e alertar sobre pragas.'
          },
          {
            title: 'Solução',
            body: 'O BioSpot é um sistema centralizado que permite a denúncia de focos de pragas por meio de uma interface web ou app com modo offline. As denúncias são triadas e encaminhadas aos fiscais para validação em campo, e após confirmação, especialistas analisam e validam as suspeitas. A plataforma fornece uma visão completa e em tempo real das áreas afetadas, permitindo mapeamento e gestão das ações de combate. Com isso, gestores podem planejar campanhas direcionadas e ajustar estratégias conforme necessário para uma resposta rápida e eficaz.'
          }
        ]"
        class="flex flex-col gap-2"
      >
        <h6 class="underline decoration-primary-500 text-xl font-semibold">
          {{ info.title}}
        </h6>

        <span>
          {{ info.body }}
        </span>
      </div>
    </section>
  </section>
</template>

<script setup>

  await definePage({
    title: 'Início',
    security_type: 'both'
  });

  const img = useImage();

  const homeImg = computed(() => img('/home.jpg'));

</script>
