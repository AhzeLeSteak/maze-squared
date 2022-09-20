<template>

  <div class="centered" style="display: flex">
    <div class="toolbox">
      <button v-for="button of buttons" @click="button.onclick()" :style="button.style"></button>
    </div>

    <canvas id="top-view"></canvas>
  </div>


</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Game} from "@/Engine/Game";
import {CanvasTopView} from "@/Rendering/CanvasTopView";


const bg = (txt_name: string) => `background-image: url("/assets/ui/toolbox/${txt_name}.png")`

export default defineComponent({
  name: 'Edit',
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  },
  data(){
    return {
      buttons: [
        {
          style: bg('wall_floor'),
          onclick: () => {
            console.log('a');
          }
        }
      ]
    }
  },
  mounted() {
    const renderer = new CanvasTopView(this.game, 64, document.getElementById("top-view") as HTMLCanvasElement);
    this.game.loop([renderer]);
  },
  unmounted() {
    this.game.stop();
  }
})
</script>

<style>
  .toolbox{
    --size: 68px;
    display: grid;
    grid-template: repeat(5,var(--size)) / repeat(1, var(--size));
  }

  .toolbox button{
    background-size: 64px;
    padding: 0;
    image-rendering: pixelated;
  }

  #top-view{
    margin-left: 64px;
  }
</style>