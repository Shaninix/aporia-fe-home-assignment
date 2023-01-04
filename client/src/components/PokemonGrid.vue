<template>
  <div v-if="filteredPokemons.length === 0 && !$vuetify.display.mobile">
    <h1 class="pokemon-title">
      Oops! no pokemon was found but here's a chance to find other pokemons
    </h1>
    <PokemonYellow />
  </div>

  <h1 v-else-if="filteredPokemons.length === 0" class="no-data-title">
    No pokemon found
  </h1>

  <v-container v-else>
    <h1 class="pokemon-title">Pokemons</h1>
    <v-row>
      <v-col
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        cols="12"
        md="4"
        lg="3"
        sm="6"
        xs="12"
      >
        <v-lazy
          v-model="pokemon.isActive"
          :options="{
            threshold: 0.5,
          }"
          transition="fade-transition"
        >
          <PokemonCard :pokemon="pokemon" />
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "../store";
import PokemonCard from "./PokemonCard.vue";
import PokemonYellow from "./PokemonYellow.vue";

export default {
  components: { PokemonCard, PokemonYellow },
  setup() {
    const store = useStore();

    const filteredPokemons = computed(() => {
      return store.state.filteredPokemons;
    });

    const isLoading = computed(() => {
      return store.state.isLoading;
    });

    return {
      filteredPokemons,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 450px) {
  .no-data-title {
    font-family: "Ketchum";
    color: #425465;
    margin-left: 1rem;
    font-size: 2.3;
  }
}
.pokemon-title {
  font-family: "Ketchum";
  color: #425465;
  margin-bottom: 1rem;
  font-size: 3.3rem;
}
.no-data-title {
  font-family: "Ketchum";
  color: #425465;
  margin-bottom: 1rem;
  font-size: 3.3rem;
}
</style>
