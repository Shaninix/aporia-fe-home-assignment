<template>
  <div v-if="isLoading" class="ball"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isLoading: {
      required: true,
      type: Boolean,
    },
  },
});
</script>

<style scoped>
html,
body {
  background: #ffdf6d;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.ball {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  box-shadow: -20px 0 rgba(0, 0, 0, 0.1) inset;
  animation: roll 1s ease-in-out infinite;
  background: linear-gradient(
    to bottom,
    #e83e35 0%,
    #e83e35 50.5%,
    #ffffff 50.51%,
    #ffffff 100%
  );
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
}

.ball:after {
  content: "";
  position: absolute;
  top: 47px;
  left: 0;
  width: 100px;
  height: 6px;
  background: #3f3f3f;
}

.ball:before {
  content: "";
  position: absolute;
  top: 40px;
  left: 40px;
  width: 20px;
  height: 20px;
  border: solid 6px #3f3f3f;
  border-radius: 50%;
  background: white;
  z-index: 1;
  box-shadow: 0 0 15px -2px #c62828 inset;
  animation: button 3s ease infinite;
}

@-webkit-keyframes roll {
  from {
    transform: rotate(0);
  }
  90%,
  to {
    transform: rotate(720deg);
  }
}

@-webkit-keyframes button {
  from,
  50%,
  to {
    box-shadow: 0 0 15px -2px #c62828 inset;
  }

  25%,
  75% {
    box-shadow: 0 0 10px -2px #1300ea inset;
  }
}
</style>
