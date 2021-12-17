<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title>Revision Progress Tracker: Dashboard</v-card-title>
      </v-card>
      <v-card class="my-2 card">
        <v-calendar></v-calendar>
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