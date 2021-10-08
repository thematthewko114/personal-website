<template>
  <v-app>
    <v-app-bar flat class="primary">
      <v-btn class="no-active" text to="/">
        <v-card-title>Matthew Ko</v-card-title>
      </v-btn>
      <v-spacer></v-spacer>
      <div v-for="page in pages" :key="page.name">
        <v-btn class="no-active" text :to="page.route">
          <v-icon class="mr-2">{{page.icon}}</v-icon>
          {{page.name}}
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
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
        {name: 'Projects', icon: 'mdi-tools', route: '/projects'},
        {name: 'Learnings', icon: 'mdi-book', route: '/learnings'},
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
  .v-btn--active.no-active::before {
    opacity: 0 !important;
  }
  .card {
    background-color: #494949
  }
</style>