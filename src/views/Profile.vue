<template>
  <v-app>
    <v-container>
      <v-card class="card my-2">
        <v-card-title style="font-size:30px">Profile</v-card-title>
      </v-card>
      <v-card class="card">
        <v-card-title><b>About Me</b></v-card-title>
        <p v-if="introduction" class="pa-4">{{introduction[0].text}}</p>
      </v-card>
      <div v-if="interests">
        <v-card class="my-2 card">
          <v-card-title><b>My Interests</b></v-card-title>
          <div v-for="interest in interests" :key="interest.id">
            <!--<v-img :src="interest.image"></v-img>!-->
            <v-card-title><b> - {{interest.name}}</b></v-card-title>
            <v-container>
              <p class="mx-4">{{interest.description}}</p>
            </v-container>
          </div>
        </v-card>
        <v-card class="my-2 card">
          <v-card-title>Education</v-card-title>
          <div v-for="education1 in education" :key="education1.id">
            <v-card-title><b> - {{education1.institution}}</b></v-card-title>
            <v-container>
              <p class="mx-4">{{education1.degree}} - {{education1.subject}}</p>
              <p class="mx-4">Period: {{education1.year}}</p>
              <p v-if="education1.achievement" class="mx-4">Achievement: {{education1.achievement}}</p>
            </v-container>
          </div>
        </v-card>
        <v-card class="card">
          <v-card-title>Technical Skills</v-card-title>
          <div v-for="skill in skills" :key="skill.name">
            <v-card-title><b>- {{skill.name}}</b></v-card-title>
            <v-container>
              <p class="mx-4">Description: {{skill.description}}</p>
              <p class="mx-4">Skill level: {{skill.level}}</p>
            </v-container>
          </div>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Profile',
  computed: {
    interests(){
      return this.$store.getters.interests
    },
    introduction(){
      return this.$store.getters.introduction
    },
    education(){
      return this.$store.getters.education
    },
    skills(){
      return this.$store.getters.skills
    }
  }
}
</script>
