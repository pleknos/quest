<template>
  <div id="map"></div>
</template>

<script>
import * as TwoGis from '2gis-maps';

export default {
  data() {
    return {
      map: null,
      showPlayer: false,
      playerCoords: [ 55.86, 38.45 ],
      playerMarker: null,
    };
  },
  mounted() {
    this.map = TwoGis.map('map', {
      'center': [ 55.86, 38.45 ],
      'zoom': 13,
    });

    DG.control.location().addTo(this.map);

    // navigator.geolocation.watchPosition(position => {
    //   const { latitude, longitude } = position.coords;
    //   this.playerCoords = [ latitude, longitude ];
    //
    //   if (this.showPlayer) {
    //     this.playerMarker.setLatLng([ latitude, longitude ]);
    //   }
    //
    //   if (!this.showPlayer) this.showPlayer = true;
    //
    // }, () => {}, { enableHighAccuracy: true });
  },
  watch: {
    // showPlayer() {
    //   this.playerMarker = TwoGis.marker(this.playerCoords, {});
    //   this.playerMarker.addTo(this.map);
    // },
  },
};
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
