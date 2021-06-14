<template>
  <form class="registration-card" @submit.prevent="submitCard" v-if="card === 1">
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
      <button type="submit" class="btn btn-next registration-forward">Вперёд</button>
    </div>
  </form>

  <form class="registration-card" @submit.prevent="submitCard" v-if="card === 2">
    <h2>Команда</h2>

    <div class="input-group">
      <label for="adults">Количество взрослых</label>
      <input type="number" :value="user.adults" placeholder="Количество взрослых в команде"
             id="adults" @change="setValue('Adults', $event)" required/>
    </div>

    <div class="input-group">
      <label for="children">Количество детей</label>
      <input type="text" :value="user.children" placeholder="Количество детей в команде" id="children"
             @change="setValue('Children', $event)">
    </div>

    <div class="input-group button-group">
      <button class="btn btn-prev registration-btn" @click="prevCard">Назад</button>
      <button type="submit" class="btn btn-next registration-btn">Вперёд</button>
    </div>
  </form>

  <form class="registration-card" v-if="card === 3">
    <h2>Оплата</h2>

    <div class="input-group button-group">
      <button class="btn btn-prev registration-btn" @click="prevCard">Назад</button>
    </div>
  </form>

  <form class="registration-card" @submit.prevent="submitCard" v-if="card === 2">
    <h2>Оплата</h2>
  </form>

</template>

<script>
import InputMask from 'inputmask';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      card: 1,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    ...mapActions('user', [ 'setName', 'setPhone', 'setAge', 'setAdults', 'setChildren' ]),
    submitCard() {
      if (this.user.age < 18) {
        alert('Возраст капитана команды должен быть от 18 лет');
        return false;
      }

      this.nextCard();
    },
    nextCard() {
      this.card++;
    },
    prevCard() {
      this.card--;
    },
    setValue(field, event) {
      this.$store.commit(`user/set${ field }`, event.target.value);
    },
  },
  mounted() {
    Inputmask().mask('input[type="tel"]');
  },
};
</script>

<style scoped>
.registration-card {
  min-height: 90vh;
  margin: 10px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  justify-content: center;

  border: 1px solid black;
}

.registration-card h2 {
  margin-bottom: 30px;

  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
}

.registration-btn {
  margin-top: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group:not(:last-of-type) {
  margin-bottom: 20px;
}

.input-group label {
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
}

.input-group label .small {
  font-size: 10px;
  font-weight: 400;
  text-transform: lowercase;
}

.input-group input {
  width: 80%;
  padding: 5px 10px;
  margin-top: 5px;
}

.button-group {
  flex-direction: row;
  justify-content: center;
}

.button-group button + button {
  margin-left: 10px;
}
</style>
