<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title style="font-size:30px">Experiences</v-card-title>
      </v-card>
        <div v-if="experiences">
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
  computed: {
    experiences(){
      return this.$store.getters.experiences
    }
  }
}
</script>

<style>

</style>