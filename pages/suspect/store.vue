<template>
  <UtilsPageFrame
    :breadcrumbs="[
      { route: 'index', name: 'Início' },
      { route: 'suspect', name: 'Suspeitas' },
      { route: 'suspect-store', name: 'Nova suspeita' },
    ]"
  >
    <UtilsCard class="gap-12">
      <section class="form-grid form-gap">
        <ExpoInputFrame
          label="Localização"
          class="col-span-12"
        >
          <div ref="mapContainer" class="h-[400px] rounded-lg" />
  
          <span class="text-sm">
            <u>{{ storeSuspectForm.lat }}</u>, <u>{{ storeSuspectForm.lng }}</u>
          </span>
        </ExpoInputFrame>
  
        <ExpoInputFrame
          label="Endereço"
          class="col-span-12"
        >
          <ExpoInputTextarea
            v-model="storeSuspectForm.address.full_address"
          />
        </ExpoInputFrame>

        <ExpoInputFrame
          label="Descrição"
          class="col-span-12"
        >
          <ExpoInputTextarea
            v-model="storeSuspectForm.description"
          />
        </ExpoInputFrame>
      </section>

      <section class="center-flex">
        <ExpoButton
          label="Confirmar"
          color="primary"
          :loading="storeSuspectLoading"
          @action="storeSuspect"
        />
      </section>
    </UtilsCard>
  </UtilsPageFrame>
</template>

<script setup>

  import L from 'leaflet';
  import { useStoreSuspectFormRequestHandler } from '~/app/suspect/handlers/storeSuspectFormRequestHandler';

  definePage({
    title: 'Nova suspeita',
  });

  const storeSuspectForm = ref({
    description: '',
    address: {
      full_address: '',
      coordinates: ''
    },
    lat: 0,
    lng: 0,
  });

  const {
    loading: storeSuspectLoading,
    request: storeSuspectRequest,
  } = useStoreSuspectFormRequestHandler(storeSuspectForm);

  async function storeSuspect() {
    storeSuspectForm.value.address.coordinates = `${storeSuspectForm.value.lat},${storeSuspectForm.value.lng}`;

    await storeSuspectRequest().then(() => {
      navigateTo('/suspect');
    });
  }

  const map = ref();
  const marker = ref();
  const mapContainer = ref();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        storeSuspectForm.value.lat = position.coords.latitude ?? 0;
        storeSuspectForm.value.lng = position.coords.longitude ?? 0;
      });
    }
  }
  
  onMounted(() => {
    getLocation();

    map.value = L.map(mapContainer.value).setView([storeSuspectForm.value.lat, storeSuspectForm.value.lng], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);

    marker.value = L.marker([storeSuspectForm.value.lat, storeSuspectForm.value.lng]).addTo(map.value);

    map.value.on('click', (e) => {
      storeSuspectForm.value.lat = e.latlng.lat;
      storeSuspectForm.value.lng = e.latlng.lng;

      if (marker.value) map.value.removeLayer(marker.value);
      
      marker.value = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map.value);
    });
  });

</script>
