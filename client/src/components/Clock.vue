<template>
  <p class="clock">{{ time }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      interval: undefined as NodeJS.Timer | undefined,
      time: "",
    };
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  created() {
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      this.time = Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format();
    }, 1000);
  },
});
</script>

<style>
@media (max-width: 450px) {
  .clock {
    font-family: "Ketchum", sans-serif;
    margin-top: 0rem;
    margin-left: 0.5rem;
    font-size: 1rem !important;
  }
}
.clock {
  font-family: Ketchum;
  font-size: 2rem;
  color: #425465;
}
</style>
