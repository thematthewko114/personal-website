<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title class="title ma-2">This is a personal website of Matthew Ko</v-card-title>
        <v-img src="../assets/KoWangPhoto.jpg"></v-img>
      </v-card>
        
      <v-card class="card">
        <v-container>
          <v-card-title v-if="home.length">{{home[0].text}}</v-card-title>
        </v-container>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>

export default {
  title: 'Home',
  data() {
    return {
      home: []
    }
  },
  mounted(){
    fetch('http://localhost:3000/homepage')
      .then(res => res.json())
      .then(data => this.home = data)
      .catch(error => console.log(error.message))
  }
};
</script>
