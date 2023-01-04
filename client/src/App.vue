<template>
  <v-app>
    <v-app-bar fixed color="#e9f2fa">
      <v-app-bar-title @click="handleAppBarClick">
        <v-img
          class="logo"
          src="./assets/logo.png"
          max-width="200"
          contain
        ></v-img>
      </v-app-bar-title>
      <template v-slot:append>
        <p><Clock /></p>
      </template>
    </v-app-bar>
    <v-container v-if="!$vuetify.display.mobile" class="app">
      <v-row justify="space-around">
        <v-col>
          <router-view />
        </v-col>
      </v-row>
    </v-container>
    <template v-else>
      <router-view />
    </template>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from "vue";
import Clock from "@/components/Clock.vue";
import { store } from "./store";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    onBeforeMount(() => {
      store.dispatch("fetchPokemons");
    });

    const isLoading = computed(() => {
      return store.state.isLoading;
    });

    const handleAppBarClick = () => {
      router.push("/");
    };

    return {
      isLoading,
      handleAppBarClick,
    };
  },
  components: {
    Clock,
  },
});
</script>

<style lang="scss">
@font-face {
  font-family: "Ketchum";
  src: local("Ketchum"), url(./fonts/Ketchum/Meriena.otf) format("truetype");
  font-family: "Ketchum";
  src: local("Ketchum"), url(./fonts/Ketchum/Ketchum.ttf) format("truetype");
}
#app {
  background-color: #e9f2fa;
}
.logo {
  cursor: pointer;
}
</style>
