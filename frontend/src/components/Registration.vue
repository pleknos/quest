<template>
  <form class="card" @submit.prevent="submitCard" v-if="card === 1">
    <h2>Регистрация</h2>

    <div class="input-group">
      <label for="email">E-mail</label>
      <input type="email" :value="user.email" placeholder="Введите e-mail"
             id="email" @change="setValue('Email', $event)" required/>
    </div>

    <div class="input-group">
      <label for="password">Пароль</label>
      <input type="password" v-model="password" placeholder="Введите пароль"
             id="password" required/>
    </div>

    <div class="input-group">
      <label class="small" for="agremeent">Я принимаю условия <a href="/agreement" target="_blank">Пользовательского
        соглашения</a></label>
      <input type="checkbox" id="agremeent" required>
    </div>

    <div class="input-group button-group">
      <router-link class="btn btn-prev" to="/">Назад</router-link>
      <button type="submit" class="btn btn-next">Вперёд</button>
    </div>
  </form>


  <form class="card" @submit.prevent="submitCard" v-if="card === 2">
    <h2>Капитан команды</h2>

    <div class="input-group">
      <label for="phone">Телефон</label>
      <input type="tel" :value="user.phone" data-inputmask="'mask': '+7 (999) 999-99-99'" placeholder="Введите телефон"
             id="phone" @change="setValue('Phone', $event)" required/>
    </div>

    <div class="input-group">
      <label for="name">Имя</label>
      <input type="text" :value="user.name" placeholder="Введите ФИО" id="name" @change="setValue('Name', $event)"
             required>
    </div>

    <div class="input-group">
      <label for="age">Возраст <br/>
        <span class="small">(капитан команды должен быть старше 18 лет)</span>
      </label>
      <input type="number" :value="user.age" placeholder="Введите свой возраст" id="age"
             @change="setValue('Age', $event)"
             required>
    </div>

    <div class="input-group button-group">
      <button class="btn btn-prev" @click="prevCard">Назад</button>
      <button type="submit" class="btn btn-next registration-forward">Вперёд</button>
    </div>
  </form>

  <form class="card" @submit.prevent="submitRegistration" v-if="card === 3">
    <h2>Команда</h2>

    <div class="input-group">
      <label for="players">Количество Игроков</label>
      <input type="number" :value="user.players" placeholder="Количество игроков в команде"
             id="players" @change="setValue('Players', $event)" min="2" max="6" required/>
    </div>

    <div class="input-group">
      <label for="children">Есть дети</label>
      <input type="checkbox" :checked="user.children || false" id="children"
             @change="setValue('Children', $event)">
    </div>

    <div class="input-group button-group">
      <button class="btn btn-prev" @click="prevCard">Назад</button>
      <button type="submit" class="btn btn-green">Завершить регистрацию</button>
    </div>
  </form>
</template>

<script>
import InputMask from 'inputmask';
import { mapState, mapActions } from 'vuex';

import { server } from '@/url.json';
import { nextTick } from 'vue';

export default {
  data() {
    return {
      card: 1,
      password: '',
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    ...mapActions('user', ['setName', 'setPhone', 'setAge', 'setPlayers', 'setChildren', 'setToken', 'setEmail']),
    submitCard() {
      if (this.user.age < 18 && this.card === 2) {
        alert('Возраст капитана команды должен быть от 18 лет');
        return false;
      }

      this.nextCard();
    },
    async submitRegistration() {
      const response = await fetch(`${server}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ ...this.user, password: this.password }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const responseJson = await response.json();

      if (responseJson.access_token) {
        this.$store.commit(`user/setToken`, responseJson.access_token);
      } else {
        alert('Ошибка регистрации. Попробуйте снова позже.');
      }

      this.$router.replace('/');
    },
    nextCard() {
      this.card++;
    },
    prevCard() {
      --this.card;
    },
    setValue(field, event) {
      if (event.target.type === 'checkbox') {
        this.$store.commit(`user/set${field}`, event.target.checked);
      } else {
        this.$store.commit(`user/set${field}`, event.target.value);
      }
    },
  },
  watch: {
    card(value) {
      if (value === 2) {
        nextTick(() => {
          InputMask().mask(document.querySelectorAll('input[type="tel"]'));
        });
      }
    },
  },
};
</script>
