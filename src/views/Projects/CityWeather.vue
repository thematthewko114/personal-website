<template>
  <v-app>
    <v-container>
      <v-card class="card my-2">
        <v-card-title style="font-size:30px">Current Weather of City</v-card-title>
      </v-card>
      <v-card class="card">
        <v-container>
          <v-card-subtitle>This page uses a weather API for users to search for the current weather of a city</v-card-subtitle>
        </v-container>
        <v-text-field class="ma-4" v-model="city" style="width:300px" label="Enter the city name"></v-text-field>
        <v-btn class="ma-4" @click="searchWeather(city)" :disabled="city==null">Search</v-btn>
      </v-card>
      <v-alert
        prominent
        type="error"
        v-if="error==true"
      >
        Error: the city name is invalid, please retry
      </v-alert>
      <v-card v-if="data!=null" class="card my-2">
          <v-img v-if="data.weather[0].main == 'Clear'" src="../../assets/sunny.jpg" height="300" width="1200"></v-img>
          <v-img v-if="data.weather[0].main == 'Clouds'" src="../../assets/cloudy.jpg" height="300" width="1200"></v-img>
          <v-img v-if="data.weather[0].main == 'Rain'" src="../../assets/rainy.jpg" height="300" width="1200"></v-img>
          <v-img v-if="data.weather[0].main == 'Snow'" src="../../assets/snowy.jpg" height="300" width="1200"></v-img>
          <v-card-title>City selected: {{data.name}}, {{data.sys.country}}</v-card-title>
          <v-card-title class="my-2">Weather</v-card-title>
          <v-card-subtitle>
            <v-icon v-if="data.weather[0].main == 'Rain'">mdi-weather-rainy</v-icon>
            <v-icon v-if="data.weather[0].main == 'Snow'">mdi-weather-snowy</v-icon>
            <v-icon v-if="data.weather[0].main == 'Clear'">mdi-weather-sunny</v-icon>
            <v-icon v-if="data.weather[0].main == 'Clouds'">mdi-weather-cloudy</v-icon>
            Weather: {{data.weather[0].main}}
          </v-card-subtitle>
          <v-card-subtitle>Humidity: {{data.main.humidity}}%</v-card-subtitle>
          <v-card-title class="my-2">Temperature</v-card-title>
          <v-card-subtitle>Actual Temperature: {{data.main.temp }} °C</v-card-subtitle>
          <v-card-subtitle>Feels-like Temperature: {{data.main.feels_like }} °C</v-card-subtitle>
          <v-card-title class="my-2">Wind</v-card-title>
          <v-card-subtitle>Wind speed: {{data.wind.speed }} km/h</v-card-subtitle>
          <v-card-subtitle>Wind Direction: {{data.wind.deg }} °C ({{data.wind.deg2 }})</v-card-subtitle>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Weather of a City',
  data() {
    return {
      city: null,
      data: null,
      error: false,
      image: null
    }
  },
  methods: {
    searchWeather(name){
      const key = "6cc26fdf8b4a83c10c7cd0427fe06583"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}&units=metric`
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.data = null
        this.error = false
        data.wind.deg2 = this.convertDirection(data.wind.deg)
        this.data = data
      })
      .catch(() => {
        this.error = true
      });
    },
    convertDirection(deg){
      let direction1 = 0
      let direction2 = 0
      if(deg == 0){
        return 'N'
      }
      else if(deg == 90){
        return 'E'
      }
      else if(deg == 180){
        return 'S'
      }
      else if(deg == 270){
        return 'W'
      }
      if(deg < 90 || deg >270 ){
        direction1 = 'N'
      }
      else{
        direction1 = 'S'
      }
      if(deg < 180){
        direction2 = 'E'
      }
      else{
        direction2 = 'W'
      }
      let degree = deg%90
      return direction1 + " " + degree + "° " + direction2
    }
  },
}
</script>

<style scoped>
</style>