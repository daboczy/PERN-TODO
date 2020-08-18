<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <InputTodo/>
    <ListTodo/>
  </div>
</template>

<script>
import InputTodo from './components/InputTodo.vue'
import ListTodo from './components/ListTodo.vue'

export default {
  name: 'App',
  components: {
    InputTodo,
    ListTodo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
