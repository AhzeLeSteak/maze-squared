<template>

  <div id="canvas-container"></div>

</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Game} from "@/Engine/Game";
import {CanvasRaycast} from "@/Rendering/CanvasRaycast";

export default defineComponent({
  name: 'Play',
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  },
  mounted() {
    console.log('mounted');
    const renderer = new CanvasRaycast(window.innerWidth*.8, window.innerHeight*.8);
    this.game.loop([renderer]);
  },
  unmounted() {
    this.game.stop();
  }
})
</script>
