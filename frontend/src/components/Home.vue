<template>
  <section class="home">
    <div class="card">
      <router-link to="/register" class="btn" v-if="!user.token">Регистрация</router-link>
      <router-link to="/login" class="btn" v-if="!user.token && isStarted">Войти</router-link>
      <router-link to="/map" class="btn" v-if="user.token && isStarted">Карта</router-link>
      <div v-if="user.token && !isStarted">
        <h2>Вы успешно зарегистрировались!</h2>
        <p>Теперь вы можете расслабиться и ожидать начала фестиваля</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isStarted: false,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
};
</script>
