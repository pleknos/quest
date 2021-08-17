<template>
  <form class="card" @submit.prevent="submitLogin">
    <h2>Войти</h2>

    <div class="input-group">
      <label for="email">E-mail</label>
      <input type="email" placeholder="Введите e-mail"
             id="email" v-model="email" required/>
    </div>

    <div class="input-group">
      <label for="password">Пароль</label>
      <input type="password" placeholder="Введите пароль"
             id="password" v-model="password" required/>
    </div>

    <div class="input-group button-group">
      <router-link class="btn btn-prev" to="/">Назад</router-link>
      <button type="submit" class="btn btn-next">Войти</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

import { server } from '@/url.json';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('user', ['setToken']),
    async submitLogin(event) {
      try {
        const response = await fetch(`${server}/api/auth/login`, {
          method: 'POST',
          body: JSON.stringify({ email: this.email, password: this.password }),
          headers: {
            'Content-type': 'application/json',
          },
        });

        const responseJson = await response.json();

        if (responseJson.access_token) {
          this.$store.commit(`user/setToken`, responseJson.access_token);
          this.$router.replace('/');
        } else {
          alert('Не удалось войти');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
