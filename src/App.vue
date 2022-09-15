<template>
  <!--
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
  -->
  <div id="canvas-container"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Game } from "@/Engine/Game";

export default defineComponent({
  name: "App",
  mounted() {
    const game = new Game();
    game.init().then(() => game.loop());
    console.log("mounted");
  },
});
</script>

<style></style>
