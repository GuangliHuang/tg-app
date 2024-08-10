<template>
  <div>
    <!-- <Area /> -->
    <Kline />
  </div>
</template>
<!-- <script setup lang="ts"> -->
<script>
  import WebApp from '@twa-dev/sdk'
  import Kline from './components/kline/Index.vue'
  // import Area from './components/Area/Index.vue'

  export default {
    name: "App",
    components: {
      Kline
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
