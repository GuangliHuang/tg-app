<template>
  <div>
    <button @click="showWin">
      @twa-dev/sdk --> {{ WebApp.version }}
    </button>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>
<!-- <script setup lang="ts"> -->
<script>
  import WebApp from '@twa-dev/sdk'
  // import HelloWorld from './components/HelloWorld.vue'

  export default {
    data() {
      return {
        WebApp
      }
    },
    methods: {
      showWin() {
        console.log("#WebApp ---- ", WebApp)

        this.WebApp.showPopup(`Hello World! ...`)
      }
    }
  }
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
