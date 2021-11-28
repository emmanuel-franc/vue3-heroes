<template>
  <div class="heroes-list">
    <Hero v-for="hero in heroes" :key="hero.id" :hero-info="hero" />
  </div>
</template>

<script>
import md5 from 'crypto-js/md5';
import Hero from './components/Hero.vue'
import { PRIVATE_KEY, PUBLIC_KEY } from '../config/keys.js'

export default {
  name: 'App',
  components: {
    Hero
  },
  data() {
    return {
      heroes: null
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const ts = Date.now()
      const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString()

      try {
        this.heroes = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
          .then(res => res.json())
          .then(info => {
            console.log('info.data', info.data)
            return info.data.results
          }
        )
      } catch(e) {
        throw new Error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.heroes-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
