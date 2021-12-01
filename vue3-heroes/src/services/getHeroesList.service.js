import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import md5 from 'crypto-js/md5'
import { PRIVATE_KEY, PUBLIC_KEY } from '../../config/keys.js'
import { LIMIT, OFFSET_BASE_VALUE} from '../constants/constants.js'

const ts = Date.now()
const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString()

export const GET_HEROES_LIST = () => {
  const heroesList = ref({})
  const isLoading = ref({})
  const infos = ref({})
  const error = ref({})
  const store = useStore()

  watch(() => store.state.currentPage, () => {
    getHeroesList()
  });

  const getHeroesList = async () => {
    isLoading.value = true

    try {
      const response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&offset=${(store.state.currentPage - 1) * OFFSET_BASE_VALUE}&limit=${LIMIT}`)
      const json = await response.json().then(info => info.data)

      heroesList.value = json.results
      infos.value = { count: json.count, limit: json.limit, offset: json.offset, total: json.total }

      store.dispatch('UPDATE_TOTAL', infos.value.total)
      store.dispatch('UPDATE_HEROES_LIST', heroesList.value)
    } catch(e) {
      error.value = e
    } finally {
      isLoading.value = false
    }

    return { heroesList, isLoading, infos, error }
  }

  onMounted(getHeroesList)

  return { heroesList, isLoading, infos, error, getHeroesList }
}
