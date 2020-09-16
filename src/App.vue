<template>
  <div id="app">
    <GameComponent/>
  </div>
</template>

<script>
// import FlashScreen from './components/FlashScreen.vue'
import GameComponent from './components/GameComponent.vue'

import { ipcRenderer } from 'electron'

export default {
  name: 'App',
  components: {
    // FlashScreen,
    GameComponent
  },
  data: function() {
    return {
    }
  },
  computed: {
  },
  mounted() {
    // this.$remote.globalShortcut.unregister('CommandOrControl+Shift+Printscreen');
    // this.$remote.globalShortcut.register('CommandOrControl+Shift+Printscreen', () => {
        // this.makeScreenshots();
    // })

    // ipcRenderer.on('vuex', (event, arg) => {
      // if (arg === 'makeScreenshots') {
        // this.$store.dispatch('makeScreenshots');        
      // }
    // })
  },
  watch: {

  },
  destroyed() {
    // this.$remote.globalShortcut.unregisterAll()
  },
  methods: {
    //win.focus() on capture
  },
}
</script>

<style>
#app {
  position: absolute;
  top:  0;
  left:  0;
  width:  100%;
  height:  100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
