<template>
  <v-app>
    <v-container>
        <v-card-title class="title">Experience</v-card-title>
        <div v-if="experiences.length">
          <div v-for="experience in experiences" :key="experience.id">
            <v-card class="my-2 card">
              <v-card-title><b>{{experience.company}} - {{experience.name}}</b></v-card-title>
              <v-container>
                <p class="ma-4">Period: {{experience.period}}</p>
                <p class="ma-4" v-if="experience.content">{{experience.content}}</p>
                <p class="ma-4" v-if="experience.tools">Tools used: {{experience.tools}}</p>
              </v-container>
            </v-card>
          </div>
        </div>
        
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Experiences',
  data() {
    return {
      experiences: []
    }
  },
  mounted(){
    fetch('http://localhost:3000/experiences')
      .then(res => res.json())
      .then(data => this.experiences = data)
      .catch(error => console.log(error.message))
  }
}
</script>

<style>

</style>