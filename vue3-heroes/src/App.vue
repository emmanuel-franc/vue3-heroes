<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
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
