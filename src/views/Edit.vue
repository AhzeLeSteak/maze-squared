<template>

  <div class="centered" style="display: flex">
    <div class="toolbox">
      <button v-for="button of buttons" @click="button.onclick()" :style="button.style"></button>
    </div>

    <canvas id="top-view"></canvas>
  </div>


</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Game } from "@/Engine/Game";
import { CanvasTopView } from "@/Rendering/CanvasTopView";
import { LevelEditor } from "@/Rendering/LevelEditor";


const bg = (txt_name: string) => `background-image: url("assets/ui/toolbox/${txt_name}.png")`;

export default defineComponent({
  name: "Edit",
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  },
  data() {
    return {
      buttons: [] as { onclick: () => void, style?: string }[]
    };
  },
  mounted() {
    const tile_size = 64;
    const canvas = document.getElementById("top-view") as HTMLCanvasElement;
    const level_editor = new LevelEditor(canvas, tile_size, this.game);
    this.game.loop([new CanvasTopView(this.game, tile_size, canvas)]);
    this.buttons = [
      {
        style: bg("wall_floor"),
        onclick: () => {
          console.log("a");
        }
      },
      {
        onclick: () => {
          level_editor.reset_map();
        }
      }
    ];

  },
  unmounted() {
    this.game.stop();
  }
});
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
