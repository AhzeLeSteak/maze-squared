<template>

  <div v-if="level_editor" class="toolbox">
    <button v-for="(tool, index) of level_editor.AVAILABLE_TOOLS"
            :style="tool_style(tool.texture_name, index)"
            :title="tool.tooltip"
            @click="level_editor.select(index)"
    ></button>
  </div>

  <div class="centered" style="display: flex">

    <canvas id="top-view"
            @click="level_editor.click($event)"
            @mousedown="level_editor.dragging = $event.button"
            @mouseup="level_editor.dragging = -1"
            @contextmenu="level_editor.context_menu($event)"
            @mousemove="level_editor.mouse_move($event)"
            @mouseleave="level_editor.mouse_leave($event)"
    ></canvas>


    <div style="display: none">
      <img id="hearts" src="/assets/ui/toolbox/tp_hearts.png">
      <img id="clubs" src="/assets/ui/toolbox/tp_clubs.png">
      <img id="diamonds" src="/assets/ui/toolbox/tp_diamonds.png">
      <img id="spades" src="/assets/ui/toolbox/tp_spades.png">
    </div>
  </div>


</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Game} from "@/Engine/Game";
import {CanvasTopView} from "@/Rendering/CanvasTopView";
import {LevelEditor} from "@/Engine/LevelEditor/LevelEditor";


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
      level_editor: undefined as undefined | LevelEditor
    };
  },
  mounted() {
    const tile_size = 64;
    const canvas = document.getElementById("top-view") as HTMLCanvasElement;
    const renderer = new CanvasTopView(this.game, tile_size, canvas);
    this.level_editor = new LevelEditor(this.game, renderer);
    this.game.start_loop(renderer);

  },
  unmounted() {
    this.game.stop();
  },
  methods: {
    tool_style(txt_name: string, index: number) {
      return `background-image: url("assets/ui/toolbox/${txt_name}.png");`
        + (index === this.level_editor?.tool_index
          ? "outline: 4px solid red;"
          : "");
    }
  }
});
</script>

<style>
  .toolbox {
    position: fixed;
    left: 5vw;
    top: 50vh;
    transform: translateY(-50%);
    --size: 68px;
    display: grid;
    grid-template: repeat(7, var(--size)) / repeat(2, var(--size));
    gap: 4px;
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
