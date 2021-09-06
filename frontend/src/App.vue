<template>
  <router-view></router-view>
</template>

<script>
import { server } from '@/url.json';
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  mounted() {
    this.checkStarted();
  },
  methods: {
    ...mapActions('event', ['setStarted']),
    async checkStarted() {
      const response = await fetch(`${server}/api/event/`, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`,
        },
      });
      const responseJson = await response.json();
      console.log(responseJson.started || false);
      this.setStarted(responseJson.started || false);
    },
  },
};
</script>

<style lang="scss">
@import "assets/css/imports.scss";
</style>


