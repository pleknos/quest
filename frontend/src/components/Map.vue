<template>
  <div id="map"></div>

  <div class="loadingio-spinner-wedges-d8f8dabh95w" v-show="isLoading">
    <div class="ldio-0xpxhl7475d">
      <div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  </div>


  <div class="target-container" v-if="!geolocation">
    <div class="target">
      <!--      <div class="target-close" @click="closeNotify"></div>-->
      <div class="target-about">
        <div class="target-text">
          Для работы приложения необходимо активировать слубу геолокации на вашем телефоне. Также необходимо разрешить
          доступ к геополакации вашему браузеру.
        </div>
        <div class="target-text"><a href="https://support.apple.com/ru-ru/HT207092" target="_blank">Инструкция для
          IOS</a>
        </div>
        <div class="target-text"><a href="https://support.google.com/nexus/answer/3467281?hl=ru" target="_blank">Инструкция
          для
          Android</a></div>
      </div>
    </div>
  </div>

  <div class="target-container" v-if="activeTarget">
    <div class="target-success" v-if="sendSuccess"></div>

    <form class="target" :class="{inactive: isLoading}" @submit.prevent="sendAnswer($event, activeTarget)" v-else>
      <div class="target-close" @click="closeTarget"></div>

      <div class="target-about">
        <h3 class="target-title target-name">{{ activeTarget.name }}</h3>
        <p class="target-address">{{ activeTarget.address }}</p>
        <p class="target-text">{{ activeTarget.about }}</p>
        <img :src="activeTarget.pic" :alt="`${activeTarget.name} фото`" v-if="activeTarget.pic">
      </div>

      <div class="target-answer" v-if="activeTarget.onPoint">
        <div class="target-answer_text">
          <label for="feedback">Оставьте отзыв</label>
          <input id="feedback" type="text" name="feedback"/>
        </div>
        <div class="target-answer_selfie">
          <label for="selfie">Селфи</label>
          <input id="selfie" type="file" name="selfie" accept="image/*" required/>
        </div>
      </div>

      <div class="input-group button-group target-buttons" v-if="activeTarget.onPoint">
        <button type="submit" class="btn btn-green">Отправить</button>
      </div>

    </form>
  </div>


</template>

<script>
import * as TwoGis from '2gis-maps';
import { mapActions, mapState } from 'vuex';

import { server } from '@/url.json';

export default {
  data() {
    return {
      map: null,
      showPlayer: false,
      playerCoords: [55.86, 38.45],
      playerMarker: null,
      activeTarget: null,
      sendSuccess: null,
      sendFail: null,
      markers: [],
      geolocation: true,
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      isStarted: state => state.event.isStarted,
      targets: state => state.targets.list,
      questFinished: state => state.targets.finished,
    }),
  },
  async mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
    }, () => {
      this.geolocation = false;
    });

    this.map = TwoGis.map('map', {
      'center': [55.86, 38.45],
      'zoom': 13,
    });

    if (this.targets.timestamp || (this.targets.length === 0 && !this.questFinished)) {
      const response = await fetch(`${server}/api/target/`, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`,
        },
      });

      const responseJson = await response.json();

      this.setTargets(responseJson);
    }

    for (const target of this.targets) {
      let targetClassName = 'target-marker';

      if (target.adult) {
        targetClassName = 'target-marker_adult';
      } else if (target.start) {
        targetClassName = 'target-marker_start';
      }

      const marker = TwoGis.marker([target.latitude, target.longitude], {
        popupAnchor: [0, 0],
        icon: TwoGis.divIcon({
          className: targetClassName,
          iconSize: [30, 30],
          riseOnHover: true,
        }),
      });

      marker.target = target;

      this.markers.push(marker);

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
    ...mapActions('targets', ['setTargets', 'removeTarget', 'setMarker']),
    async handleMarkerClick(target) {
      this.isLoading = true;

      const response = await fetch(`${server}/api/target/${target.id}`, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`,
        },
      });

      if (this.playerCoords[0] - 0.0005 < parseFloat(target.latitude) && this.playerCoords[0] + 0.0005 > parseFloat(target.latitude) &&
          this.playerCoords[1] - 0.0005 < parseFloat(target.longitude) && this.playerCoords[1] + 0.0005 > parseFloat(target.longitude)) {
        this.activeTarget = {
          ...await response.json(),
          onPoint: true,
        };
      } else {
        this.activeTarget = {
          ...await response.json(),
          onPoint: false,
        };
      }

      this.isLoading = false;
    },
    closeTarget() {
      this.activeTarget = null;
    },
    closeNotify() {
      this.geolocation = true;
    },
    async sendAnswer(event, activeTarget) {
      const formData = new FormData(event.target);
      formData.append('targetId', activeTarget.id);

      this.isLoading = true;

      const response = await fetch(`${server}/api/answer/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.user.token}`,
        },
        body: formData,
      });

      const responseJson = await response.json();

      this.isLoading = false;

      if (responseJson.success) {
        this.sendSuccess = true;

        this.removeTarget(activeTarget.id);
        this.markers.forEach(marker => {
          if (marker.target.id === activeTarget.id) marker.remove();
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
