<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title style="font-size:30px">Awards and Certificates</v-card-title>
      </v-card>
      <div v-if="awards">
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
  computed:{
    awards(){
      return this.$store.getters.awards
    }
  }
}
</script>

<style>

</style>