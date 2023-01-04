<template>
  <v-timeline
    :direction="$vuetify.display.mobile ? 'vertical' : 'horizontal'"
    line-inset="12"
    side="end"
  >
    <v-timeline-item
      v-for="evolution in evolutions"
      :key="evolution.id"
      dot-color="#adcce9"
      size="110"
      class="evolution-item"
    >
      <template v-slot:icon>
        <a
          :href="
            router.resolve({
              name: 'PokemonPage',
              params: { id: evolution.id },
            }).href
          "
        >
          <v-avatar :image="evolution.image_url" size="110"> </v-avatar>
        </a>
      </template>
      <div>
        <h1 class="evolution-title">{{ evolution.name }}</h1>
        <div class="types">
          <p
            v-for="type in evolution.types"
            :key="type"
            class="evolution-types"
            :class="[type]"
          >
            {{ type }}
          </p>
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import { store } from "@/store";
import { Pokemon } from "@/types";
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import "../assets/global.css";
export default defineComponent({
  setup() {
    const router = useRouter();
    const handleEvolutionClick = (id: string) => {
      router.push("/pokemon/" + id);
      store.dispatch("fetchCurrPokemon", id);
    };

    return {
      handleEvolutionClick,
      router,
    };
  },
  props: {
    evolutions: {
      required: true,
      type: Array as PropType<Pokemon[]>,
    },
  },
});
</script>

<style>
.evolution-title {
  color: #478ac9;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
}
.evolution-types {
  /* color: #425465; */
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  font-style: italic;
  width: 5rem;
  height: 1.5rem;
  margin-top: 0.5rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
}
.evolution-item {
  cursor: pointer;
}
.v-timeline-divider__inner-dot:hover {
  background-color: #425465 !important;
}
.types {
  display: flex;
  justify-content: center;
}
</style>
