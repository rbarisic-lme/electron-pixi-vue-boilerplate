<template>
  <div id="game">Game goes here!</div>
</template>

<script>
  import Game from '@Game/index.js'
  // import Vue from 'vue';
  // import VueToast from 'vue-toast-notification';
  // import 'vue-toast-notification/dist/theme-default.css';

  export default {
    name: '',
    components: {

    },
    data: function() {
      return {

      }
    },
    props: {

    },
    computed: {

    },
    mounted() {
      Game.run();
    },
    watch: {

    },
    methods: {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>