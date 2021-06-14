<template>
  <Registration/>
</template>

<script setup>
import Registration from './components/Registration.vue';
import ResetCss from './assets/css/reset.css';
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}

* {
  font-family: inherit;
}

.btn {
  padding: 6px 15px;

  text-transform: uppercase;

  background-color: transparent;
  border: 1px solid #2c3e50;
}
</style>
