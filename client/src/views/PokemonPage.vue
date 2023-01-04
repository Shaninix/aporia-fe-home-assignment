<template>
  <v-card
    elevation="3"
    class="mx-auto pokemon-page text-center"
    color="#e9f2fa"
    :loading="isLoading"
    min-height="850"
    v-if="!$vuetify.display.mobile"
  >
    <Spinner :isLoading="isLoading" />
    <v-main>
      <v-card-title class="pokemon-title">{{ pokemon.name }}</v-card-title>
      <v-img :src="pokemon.image_url" class="pokemon-img"></v-img>
      <v-card-text class="text-left pokemon-description">
        {{ pokemon?.description }}
      </v-card-text>
      <EvolutionTimeline :evolutions="evolutions" v-if="evolutions" />
    </v-main>
  </v-card>
  <v-main v-else>
    <Spinner :isLoading="isLoading" />
    <v-card-title class="pokemon-title">{{ pokemon.name }}</v-card-title>
    <v-img :src="pokemon.image_url" class="pokemon-img"></v-img>
    <v-card-text class="text-left pokemon-description">
      {{ pokemon?.description }}
    </v-card-text>
    <EvolutionTimeline :evolutions="evolutions" v-if="evolutions" />
  </v-main>
</template>

<script lang="ts">
import EvolutionTimeline from "@/components/EvolutionTimeline.vue";

import { computed, defineComponent, onBeforeMount, onMounted, ref } from "vue";
import { Pokemon } from "@/types";
import { store } from "@/store";
import { useRoute } from "vue-router";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  setup() {
    const route = useRoute();

    store.dispatch("fetchCurrPokemon", route.params.id);

    const isLoading = computed(() => {
      return store.state.isLoading;
    });

    const pokemon = computed(() => store.state.currPokemon);

    const pokemons = computed(() => {
      return store.state.pokemons;
    });

    const evolutions = computed(() => {
      const evolutions = [];
      let currEvolution: Pokemon | undefined = pokemon.value;
      let nextEvolution: Pokemon | undefined = undefined;
      let prevEvolution: Pokemon | undefined = undefined;

      // if current pokemon has evolutions
      if (currEvolution.evolutions) {
        // find next evolution
        if (currEvolution.evolutions.length) {
          currEvolution.evolutions.map((evolution) => {
            // find the next evolution pokemon
            nextEvolution = pokemons.value.find(
              (pokemon) => pokemon.id === evolution.id
            );
          });
        }

        // find prev evolution
        prevEvolution = pokemons.value.find((pokemon) => {
          if (pokemon.evolutions.length) {
            return pokemon.evolutions.find(
              (evo) => evo.id === currEvolution?.id
            );
          }
        });

        // If prev evolution doesn't exist print curr evolution and get the next evolutions
        if (!prevEvolution) {
          while (currEvolution) {
            evolutions.push(currEvolution);
            if (currEvolution.evolutions.length) {
              currEvolution.evolutions.map((evolution) => {
                // find the next evolution pokemon
                nextEvolution = pokemons.value.find(
                  (pokemon) => pokemon.id === evolution.id
                );
              });
            } else {
              nextEvolution = undefined;
            }
            currEvolution = nextEvolution;
          }
          // If next evolution doesn't exist print curr evolution and get the prev evolutions
        } else if (!nextEvolution) {
          while (currEvolution) {
            evolutions.push(currEvolution);
            prevEvolution = pokemons.value.find((pokemon) => {
              if (pokemon.evolutions.length) {
                return pokemon.evolutions.find(
                  (evo) => evo.id === currEvolution?.id
                );
              } else {
                return undefined;
              }
            });
            currEvolution = prevEvolution;
          }
          evolutions.reverse();
          //If we have prev and next print in order
        } else {
          currEvolution &&
            evolutions.push(prevEvolution, currEvolution, nextEvolution);
        }
      }

      return evolutions;
    });

    return {
      pokemon,
      evolutions,
      isLoading,
    };
  },
  components: {
    EvolutionTimeline,
    Spinner,
  },
});
</script>

<style>
.pokemon-title {
  color: #425465;
  font-family: Ketchum, sans-serif;
  font-size: 3.5rem;
}
.pokemon-img {
  width: 20rem;
  margin: auto;
}
.pokemon-description {
  font-family: "Open Sans", sans-serif;
  font-style: italic;
  font-size: 1rem;
  margin: 1rem;
  color: #425465;
}
.pokemon-page {
  width: 70%;
  margin-top: 4rem;
}
</style>
