<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title style="font-size:30px">Projects</v-card-title>
      </v-card>
        <div v-if="projects">
        <div v-for="project in projects" :key="project.id">
          <v-card class="my-2 card">
            <v-card-title><strong>Name: {{project.name}}</strong></v-card-title>
            <v-container>
              <p class="ma-4">Description: {{project.description}}</p>
              <p class="ma-4">Tools used: {{project.tools}}</p>
              <v-btn v-if="project.redirect==true" class="ma-4" color="green" :href="project.route"><v-icon class="mr-2">mdi-arrow-right</v-icon>Visit Project</v-btn>
              <v-btn v-else class="ma-4" color="green" :to="project.route"><v-icon class="mr-2">mdi-arrow-right</v-icon>Visit Project</v-btn>
            </v-container>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Projects',
  computed: {
    projects(){
      return this.$store.getters.projects
    }
  }
}
</script>

<style>
</style>