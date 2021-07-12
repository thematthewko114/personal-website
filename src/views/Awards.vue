<template>
  <v-app>
    <v-container>
        <v-card-title class="title">Awards and Certificates</v-card-title>
        <div v-if="awards.length">
        <div v-for="award in awards" :key="award.id">
          <v-card class="my-2 card">
            <v-card-title><b>{{award.name}}</b></v-card-title>
            <v-container>
              <p class="ma-4">{{award.organization}}</p>
              <p class="ma-4">{{award.date}}</p>
            </v-container>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Awards',
  data() {
    return {
      awards: []
    }
  },
  mounted(){
    fetch('http://localhost:3000/awards')
      .then(res => res.json())
      .then(data => this.awards = data)
      .catch(error => console.log(error.message))
  }
}
</script>

<style>

</style>