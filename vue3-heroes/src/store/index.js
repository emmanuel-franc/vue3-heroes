import { createStore } from 'vuex';
import md5 from 'crypto-js/md5';
import { PRIVATE_KEY, PUBLIC_KEY } from '../../config/keys.js';
import { LIMIT } from '../constants/constants.js';

export default createStore({
  state: {
    heroesList: [],
    offset: 0,
    currentPage: 1,
    loading: true,
  },
  mutations: {
    UPDATE_HEROES_LIST(state, payload) {
      state.heroesList = payload;
    },
    UPDATE_OFFSET(state, payload) {
      state.offset = payload;
    },
    UPDATE_TOTAL(state, payload) {
      state.total = payload;
    },
    UPDATE_LOADING(state, payload) {
      state.loading = payload;
    },
    UPDATE_CURRENT_PAGE(state, payload) {
      state.currentPage = payload;
    },
  },
  actions: {
    async GET_HEROES_LIST({ commit, state }, offset = state.offset) {
      commit('UPDATE_LOADING', true);

      const ts = Date.now()
      const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString()

      try {
        const data = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&offset=${offset}&limit=${LIMIT}`)
          .then(res => res.json())
          .then(info => {
            return info.data
          })

        commit('UPDATE_OFFSET', offset)
        commit('UPDATE_TOTAL', data.total)
        commit('UPDATE_HEROES_LIST', data.results)
      } catch(e) {
        throw new Error(e)
      } finally {
        commit('UPDATE_LOADING', false)
      }
    },
    UPDATE_CURRENT_PAGE({ commit }, pageNumber) {
      commit('UPDATE_CURRENT_PAGE', pageNumber)
    }
  },
  getters: {
    findHero: state => id => state.heroesList.find(hero => hero.id === parseInt(id))
  },
  modules: {
  }
})
