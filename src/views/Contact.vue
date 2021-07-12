<template>
  <v-app>
    <v-container>
      <h2>Contact</h2>
      <v-card class="card">
        <v-container>
          <div v-for="contact in contacts" :key="contact.text">
            <v-btn icon :to="contact.target"><v-icon size="x-large">{{contact.icon}}</v-icon></v-btn>
            <v-card-title>{{contact.text}}</v-card-title>
          </div>
        </v-container>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Contact',
  data() {
    return {
      contacts: [
        {icon: 'mdi-instagram', target: 'https://www.instagram.com/thematthewko114/', text: 'Instagram: thematthewko114'},
        {icon: 'mdi-facebook', target: 'https://www.facebook.com/profile.php?id=100007935941212', text: 'Facebook: Matthew Ko(Matt)'},
        {icon: 'mdi-linkedin', target: 'https://www.linkedin.com/in/thematthewko114/', text: 'LinkedIn: Matthew Ko'},
        {icon: 'mdi-whatsapp', text: 'Phone / WhatsApp / Signal: (+852 9166 3826)'}
      ]
    }
  },

}
</script>

<style>

</style>