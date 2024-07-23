<template>
  <div>
    <Kline />
    <HelloWorld msg="Telegram mini app" />
  </div>
</template>
<!-- <script setup lang="ts"> -->
<script>
  import WebApp from '@twa-dev/sdk'
  import Kline from './components/kline/Index.vue'
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    components: {
      Kline, HelloWorld
    },
    data() {
      return {
        WebApp
      }
    },
    methods: {
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
