<template>

  <div id="canvas-container">
    <canvas id="play-canvas"
            class="centered"
            style="z-index: 10"
    ></canvas>
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Game } from "@/Engine/Game";
import { CanvasRaycast } from "@/Rendering/CanvasRaycast";

export default defineComponent({
  name: "Play",
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  },
  mounted() {
    this.game.start_loop(new CanvasRaycast(window.innerWidth * .8, window.innerHeight * .8, document.getElementById("play-canvas") as HTMLCanvasElement));
  },
  unmounted() {
    this.game.stop();
  },
  methods: {
    change_player_direction(dx: number) {
      this.game.player.addAngle(dx / 500);

    }
  }
});
</script>

<style>
#play-canvas {
  cursor: none;
}
</style>
