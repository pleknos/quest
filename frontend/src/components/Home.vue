<template>
  <section class="home">
    <div class="card">

      <div class="home-top" v-if="!user.token">
        <img src="/src/assets/240.png" alt="240 лет БО" class="home-240">
        <img src="/src/assets/zolotar.png" alt="Золотарь" class="home-zolot">
      </div>
      <div v-else></div>

      <div class="home-center">
        <router-link to="/register" class="home-btn" v-if="!user.token">Регистрация</router-link>
        <router-link to="/login" class="home-btn" v-if="!user.token && isStarted">Войти</router-link>
        <router-link to="/map" class="home-btn" v-if="user.token && isStarted">Карта</router-link>
        <router-link to="/about" class="home-btn" v-if="!user.token  || isStarted">О нас</router-link>
        <div class="home-info" v-if="user.token && !isStarted">
          <!--          <h2>Вы успешно зарегистрировались</h2>-->
          <!--          <p>Теперь вы можете расслабиться и подождать начала фестиваля</p>-->
          <!--          <h3>18 сентября посетите одну из стартовых точек «Торгового города»:</h3>-->
          <!--          <ul>-->
          <!--            <li>Пожарный переулок, 1 — кофейня «Steam Coffee»</li>-->
          <!--            <li>Ул. 3-го Интернационала, 73 (этаж 2) — офис продаж «МейТан»</li>-->
          <!--            <li>Ул. Советской Конституции, 2А — ресторан «Gourmet»</li>-->
          <!--          </ul>-->
          <!--          <p>Вся информация по телефону: 8(916)818-80-69</p>-->
          <h3>Фестиваль подошел к концу</h3>
          <h3>Благодарим за участие</h3>
          <div class="socials">
            <a href="https://vk.com/bogorodsk_fest" target="_blank" class="social vk"></a>
            <a href="https://www.instagram.com/bogorodsk_fest/" target="_blank" class="social fb"></a>
          </div>
        </div>
      </div>

      <img src="/src/assets/bottom.png" alt="Партнеры" class="home-bottom" v-if="!user.token">
      <div v-else></div>
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
      eventIsStarted: state => state.event.isStarted,
    }),
  },
  created() {
    this.isStarted = this.eventIsStarted;

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'event/setStarted') {
        if (state.event.isStarted !== this.isStarted) {
          this.isStarted = state.event.isStarted;
        }
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
