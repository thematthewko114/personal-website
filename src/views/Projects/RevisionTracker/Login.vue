<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title><strong><u>Revision Progress Tracker: Dashboard</u></strong></v-card-title>
        <v-card-title>Login</v-card-title>
        <v-alert v-model="alert" type="error">
          <v-btn icon @click="alert=false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
          Incorrect Validation Code
        </v-alert>
        <v-text-field v-model="password" type="password" label="Enter validation code" class="mx-4"></v-text-field>
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
      password: ''
    }
  },
  methods: {
    login(){
      if(this.password=="zzxxccvvbbnnmm"){
        this.$store.dispatch('login')
        this.$store.dispatch('getUsers')
      }
      else{
        this.alert = true
      }
      
    }
  },
  computed:{
    users(){
      return this.$store.getters.users
    }
  },
  watch:{
    users(){
      if(this.users){
        this.$router.push("/projects/revisionprogress/dashboard")
      }
    }
    
  }
}
</script>

<style>

</style>