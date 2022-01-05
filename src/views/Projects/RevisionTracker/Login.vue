<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title><strong><u>Revision Progress Tracker: Login</u></strong></v-card-title>
        <v-card-title>Login</v-card-title>
        <v-alert v-model="alert" type="error">
          <v-btn icon @click="alert=false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
          Incorrect email / password
        </v-alert>
        <v-text-field v-model="username" label="Enter email" class="mx-4"></v-text-field>
        <v-text-field v-model="pw" type="password" label="Enter password" class="mx-4"></v-text-field>
        <v-card-text>Not signed up? Click<v-btn class="mx-4" to="/projects/revisionprogress/signup">Here</v-btn> </v-card-text>
        <v-btn class="ma-4" color="green" @click="login">Login</v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: "Revision Progress Login",
  data() {
    return {
      alert: false,
      password: '',
      username: '',
      pw: ''
    }
  },
  methods: {
    login(){
      this.$store.dispatch('login', {username: this.username, password: this.pw})
    }
  },
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  watch:{
    user(){
      if(this.user){
        this.$router.push("/projects/revisionprogress/dashboard")
      }
    }
    
  }
}
</script>

<style>

</style>