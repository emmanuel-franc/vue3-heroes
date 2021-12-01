<template>
  <div>
    <Loader v-if="isLoading" />

    <template v-if="!isLoading && heroesList.length">
      <Pagination />

      <div class="heroes-list">
        <HeroItem
          v-for="hero in heroesList"
          :key="hero.id"
          :hero-info="hero"
        />
      </div>
    </template>

    <p v-else-if="!isLoading">No data available!</p>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GET_HEROES_LIST } from '../services/getHeroesList.service.js'
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
    const store = useStore()
    const route = useRoute()

    if (route.params.pageNumber) {
      store.dispatch('UPDATE_CURRENT_PAGE', parseInt(route.params.pageNumber))
    }

    const { heroesList, isLoading, infos, error } = GET_HEROES_LIST()

    onBeforeMount(() => {
      document.body.style.backgroundColor = '#0789d4'
    })

    return {
      heroesList, isLoading, infos, error
    };
  },
}
</script>

<style lang="scss" scoped>
.heroes-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>
