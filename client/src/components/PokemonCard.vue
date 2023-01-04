<template>
  <v-card
    :to="'/pokemon/' + pokemon.id"
    exact
    tile
    color="white"
    class="d-block text-truncate pokemon-card mx-auto"
  >
    <v-card-title class="pokemon-name">{{ pokemon.name }}</v-card-title>
    <v-card-subtitle class="pokemon-types">{{
      pokemon.types ? pokemon.types.join("/") : ""
    }}</v-card-subtitle>
    <p class="pokemon-description">
      {{ pokemon.description }}
    </p>

    <v-img :src="pokemon.image_url"></v-img>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Pokemon } from "../types";
import EvolutionTimeline from "./EvolutionTimeline.vue";

export default defineComponent({
  props: {
    pokemon: {
      required: true,
      type: Object as PropType<Pokemon>,
    },
  },
  components: { EvolutionTimeline },
});
</script>

<style scoped>
.pokemon-description {
  font-family: "Open Sans", sans-serif;
  font-style: italic;
  font-size: 1rem;
  margin: 1rem;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  color: #425465;
}
.pokemon-name {
  font-family: Ketchum, sans-serif;
  color: #478ac9;
  font-size: 2rem;
}
.pokemon-types {
  font-family: "Open Sans", sans-serif;
  color: #4c7397;
  font-style: italic;
}
</style>
