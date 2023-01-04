<template>
  <v-card
    elevation="3"
    class="mx-auto app-card text-center"
    color="#e9f2fa"
    :loading="isLoading"
    min-height="850"
    v-if="!$vuetify.display.mobile"
  >
    <v-main
      v-if="$vuetify.display.mobile"
      :style="$vuetify.display.mobile ? 'padding-left:33%' : ''"
    >
      <SideBar />
      <PokemonGrid />
    </v-main>
    <template v-else>
      <Spinner :isLoading="isLoading" />
      <SideBar />
      <PokemonGrid />
    </template>
  </v-card>
  <div v-else>
    <v-main
      v-if="$vuetify.display.mobile"
      :style="$vuetify.display.mobile ? 'padding-left:33%' : ''"
    >
      <Spinner :isLoading="isLoading" />
      <SideBar />
      <PokemonGrid />
    </v-main>
    <template v-else>
      <Spinner :isLoading="isLoading" />
      <SideBar />
      <PokemonGrid />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import SideBar from "@/components/SideBar.vue";
import PokemonGrid from "@/components/PokemonGrid.vue";
import Spinner from "@/components/Spinner.vue";
import { useStore } from "../store";

export default defineComponent({
  components: {
    SideBar,
    PokemonGrid,
    Spinner,
  },
  setup() {
    const store = useStore();

    const isLoading = computed(() => {
      return store.state.isLoading;
    });

    return {
      isLoading,
    };
  },
});
</script>

<style>
.app-card {
  width: 70%;
  margin-top: 4rem;
  margin-left: 17rem !important;
  min-width: fit-content;
  padding: 1rem;
}
</style>
