<template>
  <v-card>
    <h2>{{rank}}</h2>
    <p>Reaction Time: {{score}} milliseconds</p>
  </v-card>
</template>

<script>
export default {
  props: ['score'],
  data() {
    return {
      rank: null
    }
  },
  mounted() {
    if (this.score < 250) {
      this.rank = 'Reactions of a Cat!'
    } else if (this.score < 500) {
      this.rank = 'Alright!'
    } else if (this.score < 750) {
      this.rank = 'Alright!'
    } else {
      this.rank = 'Get some help'
    }
  }
}
</script>

<style>

</style>