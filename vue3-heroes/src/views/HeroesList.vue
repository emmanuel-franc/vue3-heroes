<template>
  <div class="heroes-list">
    <Hero v-for="hero in heroes" :key="hero.id" :hero-info="hero" />
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
  name: 'HeroesList',
  components: {
    Hero
  }
}
</script>
