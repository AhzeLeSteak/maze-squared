<template>

  <div id="canvas-container">
    <canvas id="play-canvas"
            class="centered"
            style="z-index: 10"
    ></canvas>
  </div>

</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Game} from "@/Engine/Game";
import {CanvasRaycast} from "@/Rendering/CanvasRaycast";

export default defineComponent({
  name: "Play",
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  },
  mounted() {
    const ratio = .5;
    this.game.start_loop(new CanvasRaycast(720 * ratio, 480 * ratio, document.getElementById("play-canvas") as HTMLCanvasElement));
  },
  unmounted() {
    this.game.stop();
  }
});
</script>

<style>
#play-canvas {
  cursor: none;
  --scale: 3;
  transform: scale(var(--scale)) translate(calc(1/var(--scale) * -50%), calc(1/var(--scale) * -50%));
}
</style>
