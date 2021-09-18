<template>
  <section class="winners">
    <input class="cols" type="number" v-model="cols">
    <div class="winner" v-for="winner in winners">
      <div class="name">{{ winner.name }}</div>
      <div class="email">{{ winner.email }}</div>
      <div class="phone">{{ winner.phone }}</div>
      <div class="count">Количество ответов: {{ winner.count }}</div>
      <div class="winner-targets" :style="`grid-template-columns: repeat(${cols}, 1fr);`">
        <div class="winner-target" v-for="target in JSON.parse(winner.data)">
          <div class="place">{{ target.target }}</div>
          <img :src="target.selfie">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import { server } from '@/url.json';

export default {
  data() {
    return {
      winners: [],
      cols: 8,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  async mounted() {
    const response = await fetch(`${server}/api/answer/winners`, {
      headers: {
        'Authorization': `Bearer ${this.user.token}`,
      },
    });

    const responseJson = await response.json();

    this.winners = responseJson.slice(0, 8);
  },
};
</script>