<template>
  <UtilsPageFrame
    :breadcrumbs="[
      { route: 'index', name: 'Início' },
      { route: 'complaint', name: 'Denúncias' },
      { route: 'complaint-store', name: 'Nova denúncia' },
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
            <u>{{ storeComplaintForm.lat }}</u>, <u>{{ storeComplaintForm.lng }}</u>
          </span>
        </ExpoInputFrame>
  
        <ExpoInputFrame
          label="Endereço"
          class="col-span-12"
        >
          <ExpoInputTextarea
            v-model="storeComplaintForm.address.full_address"
          />
        </ExpoInputFrame>

        <ExpoInputFrame
          label="Descrição"
          class="col-span-12"
        >
          <ExpoInputTextarea
            v-model="storeComplaintForm.description"
          />
        </ExpoInputFrame>
      </section>

      <section class="center-flex">
        <ExpoButton
          label="Confirmar"
          color="primary"
          :loading="storeComplaintLoading"
          @action="storeComplaint"
        />
      </section>
    </UtilsCard>
  </UtilsPageFrame>
</template>

<script setup>

  import L from 'leaflet';
  import { useStoreComplaintFormRequestHandler } from '~/app/complaint/handlers/storeComplaintFormRequestHandler';

  await definePage({
    title: 'Nova denúncia',
  });

  const storeComplaintForm = ref({
    description: '',
    address: {
      full_address: '',
      coordinates: ''
    },
    lat: 0,
    lng: 0,
  });

  const {
    loading: storeComplaintLoading,
    request: storeComplaintRequest,
  } = useStoreComplaintFormRequestHandler(storeComplaintForm);

  async function storeComplaint() {
    storeComplaintForm.value.address.coordinates = `${storeComplaintForm.value.lat},${storeComplaintForm.value.lng}`;

    await storeComplaintRequest().then(() => {
      navigateTo('/complaint');
    });
  }

  const map = ref();
  const marker = ref();
  const mapContainer = ref();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        storeComplaintForm.value.lat = position.coords.latitude ?? 0;
        storeComplaintForm.value.lng = position.coords.longitude ?? 0;
      });
    }
  }
  
  onMounted(() => {
    getLocation();

    map.value = L.map(mapContainer.value).setView([storeComplaintForm.value.lat, storeComplaintForm.value.lng], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);

    marker.value = L.marker([storeComplaintForm.value.lat, storeComplaintForm.value.lng]).addTo(map.value);

    map.value.on('click', (e) => {
      storeComplaintForm.value.lat = e.latlng.lat;
      storeComplaintForm.value.lng = e.latlng.lng;

      if (marker.value) map.value.removeLayer(marker.value);
      
      marker.value = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map.value);
    });
  });

</script>
