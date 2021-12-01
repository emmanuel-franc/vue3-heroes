import { ref } from 'vue'
import { useStore } from 'vuex'
import md5 from 'crypto-js/md5'
import { PRIVATE_KEY, PUBLIC_KEY } from '../../config/keys.js'

const ts = Date.now()
const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString()

export const GET_HERO = heroId => {
  const isLoading = ref({})
  const hero = ref({})
  const error = ref({})
  const store = useStore()

  const getHero = async () => {
    isLoading.value = true

    try {
      const response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&id=${heroId}`)
      const json = await response.json().then(info => info.data)

      hero.value = json.results[0]

      store.dispatch('UPDATE_HEROES_LIST', hero.value)
    } catch(e) {
      error.value = e
    } finally {
      isLoading.value = false
    }

    return { hero, isLoading }
  }

  getHero()

  return { hero, isLoading, getHero }
}
