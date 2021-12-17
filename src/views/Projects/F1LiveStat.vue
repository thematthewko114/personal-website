<template>
  <v-app>
    <v-container>
      <v-card class="card" v-if="data">
        <v-card-title>Race: {{data.name}}</v-card-title>
      </v-card>
      <v-card class="card my-2" v-if="data">
        <v-card-title class="my-2">Race Conditions</v-card-title>
        <v-card-subtitle>Maximum Track Temperature: {{data.weather.maxTrackTemp}}</v-card-subtitle>
        <v-card-subtitle>Minimum Track Temperature: {{data.weather.minTrackTemp}}</v-card-subtitle>
        <v-card-subtitle>Maximum Air Temperature: {{data.weather.maxAirTemp}}</v-card-subtitle>
        <v-card-subtitle>Minimum Air Temperature: {{data.weather.minAirTemp}}</v-card-subtitle>
        <v-card-subtitle>Maximum Humidity: {{data.weather.maxHumidity}}</v-card-subtitle>
        <v-card-subtitle>Minimum Humidity: {{data.weather.minHumidity}}</v-card-subtitle>
        <v-card-subtitle>Maximum Wind Speed: {{data.weather.maxWindSpeed}}</v-card-subtitle>
        <v-card-subtitle>Minimum Wind Speed: {{data.weather.minWindSpeed}}</v-card-subtitle>
        <v-card-subtitle>Weather Conditions: {{data.weather.condition}}</v-card-subtitle>
      </v-card>
      <v-card class="card" v-if="data">
        <v-card-title>Results</v-card-title>
        <v-data-table
          :items="data.standing"
          :headers="headers"
        >
          <template v-slot:item.interval="{item}">
            <div v-if="item.position!=1 && !(item.did_not_start==1 || item.retired==1 || item.disqualified==1)">+ {{item.interval}}</div>
          </template>
          <template v-slot:item.position="{item}">
            <div v-if="item.did_not_start==1">DNS</div>
            <div v-if="item.retired==1">DNF</div>
            <div v-if="item.disqualified==1">DQS</div>
            <div v-if="item.did_not_start==0 && item.retired==0 && item.disqualified==0">{{item.position}}</div>
          </template>
        </v-data-table>
        <v-card-subtitle class="my-2">Comments: {{data.comments}}</v-card-subtitle>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'F1 Race',
  props: ['id'],
  data() {
    return {
      data: null,
      headers: [
        {text: "Position", value: "position"},
        {text: "Driver", value: "name"},
        {text: "Team", value: "team_name"},
        {text: "Pitstops", value: "stops"},
        {text: "Time", value: "time"},
        {text: "Interval", value: "interval"}
      ]
    }
  },
  mounted(){
    fetch("https://f1-live-motorsport-data.p.rapidapi.com/session/"+this.id, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "f1-live-motorsport-data.p.rapidapi.com",
        "x-rapidapi-key": "68d5b8df1bmsh086fee4794fdd89p15cb42jsn00cf4832d55f"
      }
    })
    .then(response => response.json())
    .then(data => {
      let all = data.results
      let result = {}
      result.name = all.race.season + ' ' + all.race.name
      let maxTrackTemp = all.weather[0].track_temp
      let minTrackTemp = all.weather[0].track_temp
      let maxAirTemp = all.weather[0].air_temp
      let minAirTemp = all.weather[0].air_temp
      let condition = all.weather[0].conditions
      let maxHumidity = all.weather[0].humidity
      let minHumidity = all.weather[0].humidity
      let maxWindSpeed = all.weather[0].wind_speed
      let minWindSpeed = all.weather[0].wind_speed
      for(let i in all.weather){
        if(all.weather[i].track_temp>maxTrackTemp){
          maxTrackTemp = all.weather[i].track_temp
        }
        else if(all.weather[i].track_temp<minTrackTemp){
          minTrackTemp = all.weather[i].track_temp
        }
        if(all.weather[i].air_temp>maxAirTemp){
          maxAirTemp = all.weather[i].air_temp
        }
        else if(all.weather[i].air_temp<minAirTemp){
          minAirTemp = all.weather[i].air_temp
        }
        if(all.weather[i].conditions != condition){
          condition = "Mixed"
        }
        if(all.weather[i].humidity>maxHumidity){
          maxHumidity = all.weather[i].humidity
        }
        else if(all.weather[i].humidity<minHumidity){
          minHumidity = all.weather[i].humidity
        }
        if(all.weather[i].wind_speed>maxWindSpeed){
          maxWindSpeed = all.weather[i].wind_speed
        }
        else if(all.weather[i].wind_speed<minWindSpeed){
          minWindSpeed = all.weather[i].wind_speed
        }
      }
      result.standing = all.drivers
      result.comments = all.session.details.comments
      result.weather = {
        maxTrackTemp: maxTrackTemp,
        minTrackTemp: minTrackTemp,
        maxAirTemp: maxAirTemp,
        minAirTemp: minAirTemp,
        condition: condition,
        maxHumidity: maxHumidity,
        minHumidity: minHumidity,
        maxWindSpeed: maxWindSpeed,
        minWindSpeed: minWindSpeed
      }
      this.data = result
      console.log(result)
    })
    .catch(err => {
      console.error(err);
    });
  }
}
</script>

<style scoped>
</style>