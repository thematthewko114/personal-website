<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title><strong><u>Revision Progress Tracker: Signup</u></strong></v-card-title>
        <v-card-title>Signup</v-card-title>
        <v-alert v-model="alert" type="error">
          <v-btn icon @click="alert=false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
          Signup Unsuccessful. Please use another email or password
        </v-alert>
        <v-text-field v-model="username" label="Enter email" class="mx-4"></v-text-field>
        <v-text-field v-model="pw" type="password" label="Enter password" class="mx-4"></v-text-field>
        <v-text-field v-model="pw2" type="password" label="Enter password again" class="mx-4"></v-text-field>
        <v-card-text>Signed up? Click<v-btn class="mx-4" to="/projects/revisionprogress/login">Here</v-btn> </v-card-text>
        <v-btn class="ma-4" color="green" :disabled="!valid" @click="signup">Signup</v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: "Revision Progress Signup",
  data() {
    return {
      alert: false,
      username: '',
      pw: '',
      pw2: ''
    }
  },
  methods: {
    signup(){
      this.$store.dispatch("signup", {username: this.username, password: this.pw})
      console.log(this.$store.getters.user)
      if(this.$store.getters.user == null){
        this.alert = true
      }
    }
  },
  computed:{
    valid(){
      if((this.username!='' && this.pw!='' && this.pw2!= '') && (this.pw==this.pw2)){
        return true
      }
      return false
    },
    user(){
      return this.$store.getters.user
    }
  },
  watch:{
    user(){
      this.$router.push("/projects/revisionprogress/dashboard")
    }
  }
}
</script>

<style>

</style>