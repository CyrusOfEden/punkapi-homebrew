import Vue from "vue"
import Vuex from "vuex"

import * as BeerAPI from "./services/BeerAPI"

Vue.use(Vuex)

export interface State {
  currentBeer: BeerAPI.Item | null
  beers: BeerAPI.Item[]
}

export default new Vuex.Store<State>({
  state: {
    currentBeer: null,
    beers: [],
  },
  mutations: {
    setCurrentBeer(state, beer) {
      state.currentBeer = beer
    },
    setBeers(state, beers) {
      state.beers = beers
    },
  },
  actions: {
    async loadBeer({ state, commit }, id: number) {
      let beer = state.beers.find(item => item.id === id)
      if (beer != null) {
        commit("setCurrentBeer", beer)
        return beer
      }
      beer = await BeerAPI.get(id)
      if (beer == null) {
        return null
      }
      commit("setCurrentBeer", beer)
      return beer
    },
    async loadBeers({ commit }, params: BeerAPI.ListParams = {}) {
      const beers = await BeerAPI.list(params)
      commit("setBeers", beers)
      return beers
    },
  },
  modules: {},
})
