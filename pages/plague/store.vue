<template>
  <UtilsPageFrame
    :breadcrumbs="[
      { route: 'index', name: 'Início' },
      { route: 'plague', name: 'Pragas' },
      { route: 'plague-store', name: 'Nova praga' },
    ]"
  >
    <UtilsCard class="gap-12">
      <section class="form-grid form-gap">
        <ExpoInputFrame
          label="Tipo de praga"
          class="col-span-12"
        >
          <ExpoInputSelect
            v-model="storePlagueForm.plague_type_id"
            :options="plagueTypes"
            :loading="plagueTypesLoading"
            option-value="id"
            option-label="name"
          />
        </ExpoInputFrame>

        <ExpoInputFrame
          label="Localização"
          class="col-span-12"
        >
          <div ref="mapContainer" class="h-[400px] rounded-lg" />
  
          <span class="text-sm">
            <u>{{ storePlagueForm.lat }}</u>, <u>{{ storePlagueForm.lng }}</u>
          </span>
        </ExpoInputFrame>
  
        <ExpoInputFrame
          label="Endereço"
          class="col-span-12"
        >
          <ExpoInputTextarea
            v-model="storePlagueForm.address.full_address"
          />
        </ExpoInputFrame>

        <ExpoInputFrame
          label="Descrição"
          class="col-span-12"
        >
          <ExpoInputTextarea
            v-model="storePlagueForm.description"
          />
        </ExpoInputFrame>
      </section>

      <section class="center-flex">
        <ExpoButton
          label="Confirmar"
          color="primary"
          :loading="storePlagueLoading"
          @action="storePlague"
        />
      </section>
    </UtilsCard>
  </UtilsPageFrame>
</template>

<script setup>

  import L from 'leaflet';
  import { useStorePlagueFormRequestHandler } from '~/app/plague/handlers/storePlagueFormRequestHandler';
  import { useGetPlagueTypesLoadingRequestHandler } from '~/app/plague/handlers/getPlagueTypesLoadingRequestHandler';

  definePage({
    title: 'Nova praga',
  });

  const storePlagueForm = ref({
    description: '',
    address: {
      full_address: '',
      coordinates: ''
    },
    lat: 0,
    lng: 0,
  });

  const {
    loading: storePlagueLoading,
    request: storePlagueRequest,
  } = useStorePlagueFormRequestHandler(storePlagueForm);

  async function storePlague() {
    storePlagueForm.value.address.coordinates = `${storePlagueForm.value.lat},${storePlagueForm.value.lng}`;

    await storePlagueRequest().then(() => {
      navigateTo('/plague');
    });
  }

  const {
    data: plagueTypes,
    loading: plagueTypesLoading
  } = useGetPlagueTypesLoadingRequestHandler();

  const map = ref();
  const marker = ref();
  const mapContainer = ref();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        storePlagueForm.value.lat = position.coords.latitude ?? 0;
        storePlagueForm.value.lng = position.coords.longitude ?? 0;
      });
    }
  }
  
  onMounted(() => {
    getLocation();

    map.value = L.map(mapContainer.value).setView([storePlagueForm.value.lat, storePlagueForm.value.lng], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);

    marker.value = L.marker([storePlagueForm.value.lat, storePlagueForm.value.lng]).addTo(map.value);

    map.value.on('click', (e) => {
      storePlagueForm.value.lat = e.latlng.lat;
      storePlagueForm.value.lng = e.latlng.lng;

      if (marker.value) map.value.removeLayer(marker.value);
      
      marker.value = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map.value);
    });
  });

</script>
