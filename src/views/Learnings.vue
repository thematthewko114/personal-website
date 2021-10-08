<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title style="font-size:30px">My Learnings</v-card-title>
      </v-card>
      <div v-if="learnings.length">
        <div v-for="course in learnings" :key="course.id">
          <v-card class="my-2 card">
            <v-card-title><b>{{course.title}} - {{course.institute}}</b></v-card-title>
            <v-container>
              <p class="ma-4">Period: {{course.period}}</p>
              <p class="ma-4">Description: {{course.description}}</p>
            </v-container>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Learnings',
  data() {
    return {
      learnings: []
    }
  },
  mounted(){
    fetch('http://localhost:3000/learnings')
      .then(res => res.json())
      .then(data => this.learnings = data)
      .catch(error => console.log(error.message))
  }
}
</script>

<style>

</style>