<template>
  <v-navigation-drawer
    permanent
    :id="$vuetify.display.mobile ? 'nav_drawer' : ''"
    color="white"
    :border="true"
  >
    <p class="filter-title">Filter by name</p>
    <v-text-field
      class="search-text"
      label="Search..."
      hide-details="auto"
      clearable
      v-model="searchText"
      @click:clear="filterPokemons"
      @input="filterPokemons"
    >
    </v-text-field>
    <p class="filter-title">filter by type</p>
    <v-container class="pa-1 checkbox-grid">
      <v-item-group multiple>
        <v-row no-gutters>
          <v-col v-for="(type, i) in pokemonTypes" :key="i" cols="12" md="6">
            <v-item>
              <v-checkbox
                class="checkbox-type"
                :label="type"
                v-model="selectedTypes"
                :value="type"
                @change="filterPokemons"
              />
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { useStore } from "../store";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const selectedTypes = ref<String[]>([]);
    const searchText = ref("");
    const store = useStore();

    const pokemonTypes = computed(() => {
      return store.state.pokemonTypes;
    });

    const pokemons = computed(() => {
      return store.state.pokemons;
    });

    const filteredPokemons = computed(() => {
      return store.state.filteredPokemons;
    });
    const filterPokemons = () => {
      //If type was selected and there is an input search text
      if (selectedTypes.value.length > 0 && searchText.value) {
        // Filter all pokemons by both type and search text
        store.commit(
          "setFilteredPokemons",
          pokemons.value
            .filter((pokemon) =>
              pokemon.types.find((type) => {
                return selectedTypes.value.includes(type);
              })
            )
            .filter((pokemon) =>
              pokemon.name
                .toLowerCase()
                .includes(searchText.value.toLowerCase())
            )
        );
        // If only types were selected
      } else if (selectedTypes.value.length > 0) {
        // Filter all pokemons by selected types
        store.commit(
          "setFilteredPokemons",
          pokemons.value.filter((pokemon) => {
            return pokemon.types.find((type) => {
              return selectedTypes.value.includes(type);
            });
          })
        );
        // If we only have search text
      } else if (searchText.value) {
        // Filter all pokemons by the search text
        store.commit(
          "setFilteredPokemons",
          pokemons.value.filter((pokemon) => {
            return pokemon.name
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
          })
        );
        // filter the avaliable types
        filteredPokemons.value.length &&
          store.dispatch("fetchPokemonTypes", filteredPokemons.value);
        // If no filwar option was choosen show all pokemons
      } else {
        store.commit("setFilteredPokemons", pokemons.value);
        store.dispatch("fetchPokemonTypes", filteredPokemons.value);
      }
    };

    return {
      pokemons,
      pokemonTypes,
      selectedTypes,
      filteredPokemons,
      searchText,
      filterPokemons,
    };
  },
});
</script>

<style>
.filter-title {
  font-family: "Ketchum", sans-serif;
  color: #425465;
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  /* margin-left: 0.5rem; */
}
@media (max-width: 450px) {
  .filter-title {
    font-family: "Ketchum", sans-serif;
    margin-top: 1.5rem;
    margin-left: 0.5rem;
    font-size: 1.2rem;
  }
  .search-text {
    color: #425465;
    background-color: #e9f2fa;
    font-family: "Open Sans", sans-serif;
    border-style: solid;
    border-width: 1px;
    margin: 1rem;
  }
}
#nav_drawer {
  width: 33% !important;
  color: aqua;
}
.checkbox-grid {
  margin-left: 1rem;
  font-family: "Open Sans", sans-serif;
  font-style: italic;
  color: #425465;
  padding-top: -1rem;
}
.search-text {
  color: #425465;
  background-color: #e9f2fa;
  font-family: "Open Sans", sans-serif;
  border-style: solid;
  border-width: 1px;
  margin: 1rem;
}
.checkbox-type {
  margin-top: -1rem;
}
</style>
