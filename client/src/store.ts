import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import axios from 'axios'
import { Evolution, Pokemon } from './types'

export interface State {
  pokemons: Pokemon[],
  filteredPokemons: Pokemon[],
  isLoading: boolean,
  pokemonTypes: string[],
  allPokemonTypes: string[][],
  currPokemon: Pokemon,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    pokemons: <Pokemon[]>{} ,
    filteredPokemons: <Pokemon[]>{},
    isLoading: false,
    allPokemonTypes: [],
    pokemonTypes: [],
    currPokemon: <Pokemon>{},
  },
  mutations:{
    setPokemons(state, pokemons){
        state.pokemons = pokemons
    },
    setLoading(state, isLoading){
        state.isLoading = isLoading
    },
    setAllPokemonTypes(state, allPokemonTypes){
      state.allPokemonTypes = allPokemonTypes
    },
    removeDuplicatedTypes(state) {
      // flatten the pokemon types array
      const types =  state.allPokemonTypes.reduce((accumulator, value) => accumulator.concat(value), [])
      // create new array with unique types only
      state.pokemonTypes = Array.from([... new Set<string>(types)])
    },
    filterPokemons(state, selectedTypes: string[]){
      state.pokemons = state.pokemons.filter((pokemon) => {
        return pokemon.types.find(type => {return selectedTypes.includes(type)})
      })
    },
    setFilteredPokemons(state, filteredPokemons){
      state.filteredPokemons = filteredPokemons
    },
    setCurrPokemon(state, currPokemon) {
      state.currPokemon = currPokemon
    },
  },
  actions: {
   async fetchPokemons({commit,dispatch} ) {
    commit('setLoading', true)
      try {
        await axios.get("http://127.0.0.1:3001/pokemons").then(response => {
          commit('setPokemons', response.data)
          commit('setFilteredPokemons', response.data)
          dispatch('fetchPokemonTypes', response.data)
          commit('setLoading', false)
        })} catch (error) {
            console.log(error);
        }
    },
   async fetchPokemonTypes({commit}, pokemons) {
    commit('setAllPokemonTypes', pokemons.map((pokemon : Pokemon) => (pokemon.types.map((type: string)=> type))))
    commit('removeDuplicatedTypes')
   },
   async setFilteredPokemons({commit}, filteredPokemons) {
    commit('setFilteredPokemons', filteredPokemons)
   },
    async fetchCurrPokemon({commit}, id) {
      commit('setLoading', true)
      try {
        await axios.get("http://127.0.0.1:3001/pokemon/" + id).then(response => {
          commit('setCurrPokemon', response.data)
          commit('setLoading', false)
        })} catch (error) {
        console.log(error);
      }
    },
    
  },
  getters: {
    getPokemons: (state) => state.pokemons,
    getPokemon: (state) => state.currPokemon
  }
})

export function useStore () {
  return baseUseStore(key)
}