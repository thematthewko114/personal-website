<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title>Revision Progress Tracker: Login Page</v-card-title>
      </v-card>
      <v-card class="my-2 card">
        <v-card-subtitle><b><u>Enter your email and password</u></b></v-card-subtitle>
        <v-text-field label="Enter username / email" v-model="email" class="ma-4"></v-text-field>
        <v-text-field label="Enter password" v-model="password" class="ma-4"></v-text-field>
        <v-btn 
          :disabled="!passwordMatch" 
          color="green" 
          class="mx-4"
          @click="logUserIn"
        >
          Confirm
        </v-btn>
        <v-card-subtitle>Not signed up?<div><v-btn class="my-2" to="/projects/revisionprogress/signup">click here!</v-btn></div></v-card-subtitle>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Revision Progress Tracker',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods:{
    logUserIn(){
      this.$store.dispatch('logUserIn', {username: this.email, password: this.password})
      this.$router.push('/projects/revisionprogress/dashboard')
    }
  },
  computed:{
    passwordMatch(){
      if(this.password.length<8 || this.email.length<8){
        return false
      }
      return true
    }
  }
}
</script>

<style>

</style>