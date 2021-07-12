<template>
  <v-app>
    <v-container>
        <v-card-title class="title">Projects</v-card-title>
        <div v-if="projects.length">
        <div v-for="project in projects" :key="project.id">
          <v-card class="my-2 card">
            <v-card-title><b>{{project.name}}</b></v-card-title>
            <v-container>
              <p class="ma-4">{{project.description}}</p>
              <v-btn class="ma-4" color="green" :to="project.route"><v-icon class="mr-2">mdi-arrow-right</v-icon>Visit Project</v-btn>
            </v-container>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-app>
</template>.

<script>
export default {
  title: 'Projects',
  data() {
    return {
      projects: []
    }
  },
  mounted(){
    fetch('http://localhost:3000/projects')
      .then(res => res.json())
      .then(data => this.projects = data)
      .catch(error => console.log(error.message))
  }
}
</script>

<style>
</style>