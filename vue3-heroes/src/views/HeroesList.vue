<template>
  <div>
    <Loader v-if="loading" />

    <template v-if="!loading && heroesList.length">
      <Pagination />

      <div class="heroes-list" >
        <HeroItem v-for="hero in heroesList" :key="hero.id" :hero-info="hero" />
      </div>
    </template>

    <p v-else-if="!loading">No data available!</p>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { mapState } from 'vuex'
import HeroItem from '@/components/HeroItem.vue'
import Pagination from '@/components/Pagination.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'HeroesList',
  components: {
    HeroItem,
    Pagination,
    Loader,
  },
  setup() {
    onBeforeMount(() => {
      document.body.style.backgroundColor = '#0789d4'
    })
  },
  computed: {
    ...mapState(['heroesList', 'loading'])
  },
}
</script>

<style lang="scss" scoped>
.heroes-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>