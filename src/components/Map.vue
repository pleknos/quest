<template>
  <div id="map"></div>
</template>

<script>
import * as TwoGis from '2gis-maps';

export default {
  mounted() {
    const map = DG.map('map', {
      'center': [ 54.98, 82.89 ],
      'zoom': 13,
    });

    DG.control.location({ drawCircle: true, follow: true }).addTo(map);
  },
};
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
