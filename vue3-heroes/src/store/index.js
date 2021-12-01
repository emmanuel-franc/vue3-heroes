import { createStore } from 'vuex';

export default createStore({
  state: {
    heroesList: [],
    total: 0,
    currentPage: 1,
  },
  mutations: {
    UPDATE_HEROES_LIST(state, payload) {
      state.heroesList = payload;
    },
    UPDATE_TOTAL(state, payload) {
      state.total = payload;
    },
    UPDATE_CURRENT_PAGE(state, payload) {
      state.currentPage = payload;
    },
  },
  actions: {
    UPDATE_HEROES_LIST({ commit }, list) {
      commit('UPDATE_HEROES_LIST', list)
    },
    UPDATE_CURRENT_PAGE({ commit }, pageNumber) {
      commit('UPDATE_CURRENT_PAGE', pageNumber)
    },
    UPDATE_TOTAL({ commit }, total) {
      commit('UPDATE_TOTAL', total)
    },
  },
  getters: {
    findHero: state => id => state.heroesList.find(hero => hero.id === parseInt(id)),
  },
  modules: {
  }
})
