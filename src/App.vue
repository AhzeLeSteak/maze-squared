<template>

  <div class="background"></div>
  <a href="https://github.com/AhzeLeSteak/maze-squared" title="Github repo">
    <img id="main-logo" alt="main_logo" src="assets/ui/logo.png">
  </a>


  <div v-if="inited">
    <router-view :game="game" />
  </div>


</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Game } from "@/Engine/Game";
import { router } from "@/router/router";

export default defineComponent({
  name: "App",
  data(){
    return{
      inited: false,
      game: new Game()
    };
  },
  mounted() {
    this.game.init().then(() => this.inited = true);
    document.addEventListener('keypress', e => {
      if(e.code === 'KeyP'){
        router.push(this.$route.name === 'play' ? '/edit' : 'play');
      }
    })
  },
});
</script>

<style>
.centered{
  position: fixed;
  top: 55vh;
  left: 50vw;
  transform: translate(-50%, -50%);
}

#main-logo{
  position: fixed;
  left: 50vw;
  transform: translateX(-50%);
  image-rendering: pixelated;
  max-width: 98vw;
  height: 11vh;
}

.background{
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 200vw;
  height: 200vh;
  background-image: url("../public/assets/ui/background.png");
  animation: slide 8s linear infinite;
  background-size: 210px;
  image-rendering: pixelated;
}

@keyframes slide {
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(-210px, -160px); /* The image width */
  }
}

</style>
