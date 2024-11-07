<template>
  <section class="min-w-screen min-h-screen flex flex-col">
    <NuxtLoadingIndicator :color="PRIMARY_COLOR" />

    <NuxtLayout class="grow">
      <NuxtPage :page-key="route => [route.path, route.query?.fr ?? 0].join('#')" />
    </NuxtLayout>
  </section>
</template>


<script setup>

  import { PRIMARY_COLOR } from './shared/packages/constants/colors';

  /**
   *
   *                       _oo0oo_
   *                      o8888888o
   *                      88" . "88
   *                      (| -_- |)
   *                      0\  =  /0
   *                    ___/`---'\___
   *                  .'\\||     ||//'.
   *                 / \||||  :  |||// \
   *                / _||||| -:- |||||_ \
   *               |   | \\\  -  /// |   |
   *               | \_|  ''\---/''  |_/ |
   *               \  .-\__  '-'  ___/-. /
   *             ___'. .'  /--.--\  `. .'___
   *          ."" '<  `.___\_<|>_/___.' >' "".
   *         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
   *         \  \ `_.   \_ __\ /__ _/   .-` /  /
   *       ===`-.____`.___ \_____/___.-`___.-'===
   *                       `=---='
   *
   *     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   *
   *               Buddha Bless:  "No Bugs for 'Hackathon Expoferr'"
   *
   */

  const env = useEnv();

  useHead({
    titleTemplate: (title) => title ? `${title} | ${env.APP_NAME}` : env.APP_NAME,
  });

</script>

