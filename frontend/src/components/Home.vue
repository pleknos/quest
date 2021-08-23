<template>
  <section class="home">
    <div class="card">
      <router-link to="/register" class="btn" v-if="!user.token">Регистрация</router-link>
      <router-link to="/login" class="btn" v-if="!user.token && isStarted">Войти</router-link>
      <router-link to="/map" class="btn" v-if="user.token && isStarted">Карта</router-link>
      <div class="home-info" v-if="user.token && !isStarted">
        <h2>Вы успешно зарегистрировались!</h2>
        <p>Теперь вы можете расслабиться и подождать начала фестиваля</p>
        <h3>11 сентября посетите одну из стартовых точек «Торгового города»:</h3>
        <ul>
          <li>Пожарный переулок, 1 — кофейня «Steam Coffee»</li>
          <li>Ул. 3-го Интернационала, 73 (этаж 2) — офис продаж «МейТан»</li>
          <li>Ул. Советской Конституции, 2А — ресторан «Gourmet»</li>
        </ul>
        <p>Вся информация по телефону: 8(916)818-80-69</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      user: state => state.user,
      isStarted: state => state.event.isStarted,
    }),
  },
};
</script>
