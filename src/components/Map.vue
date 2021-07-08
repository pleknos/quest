<template>
  <div id="map"></div>
  <div class="questions">
    <form class="question" v-for="target of activeTargets" @submit.prevent="sendAnswer(target)">
      <div class="input-group">
        <label :for="target.id">{{ target.question }}</label>
        <input :id="target.id" type="text" name="answer" required/>
      </div>
      <div class="input-group button-group">
        <button type="submit" class="btn btn-green">Отправить ответ</button>
      </div>
    </form>
  </div>
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
      targets: [
        {
          id: 1,
          coords: [ 55.876423, 38.468773 ],
          question: 'Вопрос 1',
          answerType: 'text',
          name: 'Точка 1',
          active: false,
        },
        {
          id: 2,
          coords: [ 55.878353, 38.470219 ],
          question: 'Вопрос 2',
          answerType: 'text',
          name: 'Точка 2',
          active: false,
        },
        {
          id: 3,
          coords: [ 55.877447, 38.465088 ],
          question: 'Вопрос 3',
          answerType: 'text',
          name: 'Точка 3',
          active: false,
        },
      ],
      activeTargets: [],
    };
  },
  mounted() {
    this.map = TwoGis.map('map', {
      'center': [ 55.86, 38.45 ],
      'zoom': 13,
    });

    for (const target of this.targets) {
      const marker = TwoGis.marker(target.coords, {
        popupAnchor: [ 0, 0 ],
        icon: TwoGis.divIcon({
          className: 'target-marker',
          iconSize: [ 20, 20 ],
          riseOnHover: true,
        }),
      });

      marker.bindPopup(`<p style="text-align: center">${ target.name }</p>`).openPopup();

      marker.addTo(this.map);
    }

    navigator.geolocation.watchPosition(position => {
      const { latitude, longitude, accuracy } = position.coords;
      this.playerCoords = [ latitude, longitude ];

      for (const target of this.targets) {
        if (latitude - 0.0001 < target.coords[0] && latitude + 0.0001 > target.coords[0] &&
            longitude - 0.0001 < target.coords[1] && longitude + 0.0001 > target.coords[1]) {
          if (!target.active) {
            this.activeTargets.push(target);
          }
          target.active = true;
        }
      }

      if (this.showPlayer) {
        this.playerMarker.setLatLng([ latitude, longitude ]);
      }

      if (!this.showPlayer) {
        this.playerMarker = TwoGis.marker(this.playerCoords, {
          icon: TwoGis.divIcon({
            className: 'player-marker',
            iconSize: [ 20, 20 ],
          }),
        });
        this.playerMarker.addTo(this.map);

        this.showPlayer = true;
      }

    }, () => {}, { enableHighAccuracy: true });

  },
  methods: {
    sendAnswer(target) {
      this.activeTargets = this.activeTargets.filter(activeTarget => {
        return target.id !== activeTarget.id;
      });
      alert('Неправильно!');
    },
  },
};
</script>

<style scoped>
@import '@/assets/css/components/map.css';
</style>
