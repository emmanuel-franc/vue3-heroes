
<template>
  <div class="hero-detail">
    <Loader v-if="isLoading" />
    <template v-else>
      <BackToList />

      <img class="hero-detail__image" :src="`${hero.thumbnail.path}.${hero.thumbnail.extension}`" />

      <h1>{{ hero.name }}</h1>

      <p v-if="hero.description">{{ hero.description }}</p>

      <p v-else>No description available!</p>

      <div class="hero-detail__lists">
        <div>
          <h4>Comics</h4>
          <ul v-if="hero.comics.items.length">
            <li v-for="(comic, index) in hero.comics.items" :key="`comic-${index}`">{{ comic.name }}</li>
          </ul>

          <p v-else>No list available!</p>
        </div>

        <div>
          <h4>Series</h4>
          <ul v-if="hero.series.items.length">
            <li v-for="(serie, index) in hero.series.items" :key="`serie-${index}`">{{ serie.name }}</li>
          </ul>

          <p v-else>No list available!</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import Loader from '@/components/Loader.vue'
import BackToList from '@/components/BackToList.vue'
import { GET_HERO } from '../services/getHero.service.js'

export default {
  name: 'HeroDetail',
  components: {
    BackToList,
    Loader,
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const hero = computed(() => store.getters.findHero(route.params.id))

    onBeforeMount(() => {
      document.body.style.backgroundColor = '#a32327'
    })

    if(!hero.value) {
      const { hero, isLoading} = GET_HERO(parseInt(route.params.id))

      return {
        hero: hero,
        isLoading
      }
    }

    return {
      hero,
      isLoading: false
    }
  },
}
</script>

<style lang="scss" scoped>
.hero-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  color: #fff;

  .back-to-list {
    align-self: end;
  }

  &__image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border: 8px solid #fff;
    box-shadow: 0px 0px 8px -2px #000000;
  }

  h1 {
    font-size: 50px;
  }

  &__lists {
    display: flex;
    flex-direction: row;
    width: 100%;

    div {
      width: 50%;
    }

    h5 {
      text-align: center;
    }

    ul {
      margin: 0;
      padding: 0 10px;
    }

    li {
      padding: 10px 0;
      list-style: none;
      border-bottom: 1px solid #fff;
    }

    h4 {
      margin-bottom: 10px;
      font-size: 30px;
    }
  }
}
</style>
