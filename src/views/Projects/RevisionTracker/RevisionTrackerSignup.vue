<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title>Revision Progress Tracker: Sign Up Page</v-card-title>
      </v-card>
      <v-card class="my-2 card">
        <v-card-subtitle><b><u>Enter your email and password</u></b></v-card-subtitle>
        <v-text-field 
          label="Enter username / email" 
          v-model="email" 
          class="ma-4">
        </v-text-field>
        <v-text-field 
          label="Enter password" 
          :type="show1 ? 'text' : 'password'" 
          v-model="password" class="ma-4" 
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
          @click:append="show1 = !show1" 
        >
        </v-text-field>
        <v-text-field 
          label="Re-enter password" 
          :type="show1 ? 'text' : 'password'" 
          v-model="password2" class="ma-4" 
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
          @click:append="show1 = !show1"
        >
        </v-text-field>
        <v-btn 
          :disabled="!passwordMatch" 
          color="green" 
          class="mx-4"
          @click="signUpUser"
        >
          Confirm
        </v-btn>
        <v-card-subtitle>Return to login page?<div><v-btn class="my-2" to="/projects/revisionprogress">click here!</v-btn></div></v-card-subtitle>
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
      password: '',
      password2: '',
      show1: false
    }
  },
  methods: {
    signUpUser(){
      this.$store.dispatch('signUserUp', {
        username: this.email,
        password: this.password
      })
      this.$router.push('/projects/revisionprogress/dashboard')
    }
  },
  computed:{
    passwordMatch(){
      if(this.password.length<8 || this.email.length<8){
        return false
      }
      return this.password2 == this.password
    }
  }
}
</script>

<style>

</style>