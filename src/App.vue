<template>
  <v-app>
    <v-app-bar flat class="primary">
      <v-btn text href="/"><v-card-title>Matthew Ko</v-card-title></v-btn>
      <v-spacer></v-spacer>
      <div v-for="page in pages" :key="page.name">
        <v-btn text :to="page.route">
          <v-icon class="mr-2">{{page.icon}}</v-icon>
          {{page.name}}
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      pages: [
        {name: 'Profile', icon: 'mdi-form-select', route: '/profile'},
        {name: 'Projects', icon: 'mdi-tools', route: 'projects'},
        {name: 'Experience', icon: 'mdi-bag-personal', route: '/experience'},
        {name: 'Awards and Certificates', icon: 'mdi-trophy-award', route: '/awards'},
        {name: 'Contacts', icon: 'mdi-contacts', route: '/contacts'}
      ]
    }
  },
}
</script>
<style>
  .title{
    font-size: 36px;
    color: lightgray;
    font-family: Helvetica
  }
  a {color: white; text-decoration: none;}         /* Unvisited link  */
  a:visited {color: white; text-decoration: none;}  /* Visited link    */
  a:hover {color: white; text-decoration: none;}    /* Mouse over link */
  a:active {color: white; text-decoration: none;} 
  .card {
    background-color: #494949
  }
</style>