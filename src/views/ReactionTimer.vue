<template>
  <v-app class="center">
    <v-container>
      <v-card>
        <v-btn to="/projects" class="my-4 grey">Return to Projects</v-btn>
        <h1>Reaction Timer</h1>
        <v-btn @click="start" :disabled="isPlaying" class="px-2 my-4 green">Play</v-btn>
      </v-card>
      <Block v-if="isPlaying" :delay="delay" @end="endGame"></Block>
      <Result v-if="showResults" :score="score"></Result>
    </v-container>
  </v-app>
</template>

<script>
import Block from '../components/Block.vue'
import Result from '../components/Results.vue'
export default {
  title: 'Reaction Timer',
  components: { Block, Result },
  data () {
    return {
      isPlaying: false,
      delay: null,
      score: null,
      showResults: false
    }
  },
  methods: {
    start () {
      this.isPlaying = true
      this.showResults = false
      this.delay = 2000 + Math.random() * 4000
    },
    endGame (reactionTime){
      this.score = reactionTime
      this.isPlaying = false
      this.showResults = true
    }
  }
}
</script>

<style scoped>
.center {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #30006e;
}
button {
  border-radius: 10px;
  border: 2px solid black;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 25px;
  background-color: lime;
  color: red
}
button:disabled{
  border-radius: 10px;
  border: 2px solid black;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 25px;
  background-color: red;
  color: green;
  opacity: 0.4
}
</style>
