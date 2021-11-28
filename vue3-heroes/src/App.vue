<template>
  <router-view/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  mounted() {
    this.GET_HEROES_LIST()
  },
  methods: {
    ...mapActions(['GET_HEROES_LIST']),

  },
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  color: #fff;
  text-decoration: none;;

  &:hover {
    text-decoration: underline;
  }
}

body {
  transition: background-color 0.4s;
}
</style>
