<template>
  <div id="map"></div>
  <div class="target-container" v-if="activeTarget">

    <div class="target-success" v-if="sendSuccess"></div>

    <form class="target" @submit.prevent="sendAnswer($event, activeTarget)" v-else>
      <div class="target-close" @click="closeTarget"></div>

      <div class="target-about">
        <h3 class="target-title target-name">{{ activeTarget.name }}</h3>
        <p class="target-text">{{ activeTarget.about }}</p>
      </div>
      <div class="target-question">
        <h3 class="target-title">Вопрос</h3>
        <p class="target-text">{{ activeTarget.question }}</p>
      </div>
      <div class="target-answer">
        <div class="target-answer_text" v-if="activeTarget.answerType === 'text'">
          <label for="answer">Ответ</label>
          <input id="answer" type="text" name="answer" required/>
        </div>
        <div class="target-answer_selfie">
          <label for="selfie">Селфи</label>
          <input id="selfie" type="file" name="selfie" accept="image/*" required/>
        </div>
      </div>
      <div class="input-group button-group target-buttons">
        <button type="submit" class="btn btn-green">Отправить ответ</button>
      </div>
    </form>
  </div>


</template>

<script>
import * as TwoGis from '2gis-maps';
import { mapState } from 'vuex';

import { server } from '@/url.json';

export default {
  data() {
    return {
      map: null,
      showPlayer: false,
      playerCoords: [55.86, 38.45],
      playerMarker: null,
      targets: [{
        id: 1,
        latitude: 55.85296,
        longitude: 38.436185,
        name: 'Дом Зотова - ул Советская, 74',
      }, {
        id: 2,
        latitude: 55.878571,
        longitude: 38.45511,
        name: '10 школа - ул 8 марта, 4',
      }, {
        id: 3,
        latitude: 55.880887,
        longitude: 38.464815,
        name: 'Дом А.И. Морозова',
      }],
      activeTarget: null,
      sendSuccess: null,
      sendFail: null,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  mounted() {
    this.map = TwoGis.map('map', {
      'center': [55.86, 38.45],
      'zoom': 13,
    });

    for (const target of this.targets) {
      const marker = TwoGis.marker([target.latitude, target.longitude], {
        popupAnchor: [0, 0],
        icon: TwoGis.divIcon({
          className: 'target-marker',
          iconSize: [20, 20],
          riseOnHover: true,
        }),
      });

      marker.target = target;
      target.marker = marker;

      marker.addEventListener('click', ({ target }) => {
        this.handleMarkerClick(target.target);
      });

      // marker.bindPopup(`<p style="text-align: center">${target.name}</p>`);

      marker.addTo(this.map);
    }

    navigator.geolocation.watchPosition(position => {
      const { latitude, longitude, accuracy } = position.coords;
      this.playerCoords = [latitude, longitude];

      if (this.showPlayer) {
        this.playerMarker.setLatLng([latitude, longitude]);
      }

      if (!this.showPlayer) {
        this.playerMarker = TwoGis.marker(this.playerCoords, {
          icon: TwoGis.divIcon({
            className: 'player-marker',
            iconSize: [20, 20],
          }),
        });
        this.playerMarker.addTo(this.map);
        this.playerMarker.bindPopup(`<p style="text-align: center">Это вы</p>`);

        this.showPlayer = true;
      }

    }, () => {
    }, { enableHighAccuracy: true });
  },
  methods: {
    async handleMarkerClick(target) {
      const response = await fetch(`${server}/api/target/${target.id}`, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`,
        },
      });

      this.activeTarget = await response.json();

      //   if (latitude - 0.0001 < target.coords[0] && latitude + 0.0001 > target.coords[0] &&
      //       longitude - 0.0001 < target.coords[1] && longitude + 0.0001 > target.coords[1]) {
      //     if (!target.active) {
      //       this.activeTarget = target;
      //     }
      //     target.active = true;
      //   }
      // }
    },
    closeTarget() {
      this.activeTarget = null;
    },
    async sendAnswer(event, activeTarget) {
      const formData = new FormData(event.target);
      formData.append('targetId', activeTarget.id);

      const response = await fetch(`${server}/api/answer/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.user.token}`,
        },
        body: formData,
      });

      const responseJson = await response.json();

      if (responseJson.success) {
        this.sendSuccess = true;
        this.targets.forEach(target => {
          if (target.id === activeTarget.id) target.marker.remove();
        });
      } else {
        this.sendFail = true;
      }

      setTimeout(() => {
        this.activeTarget = null;
        this.sendSuccess = null;
        this.sendFail = null;
      }, 1000);
    },
  },
};
</script>
