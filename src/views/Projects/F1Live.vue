<template>
  <v-app>
    <v-container>
      <v-card class="card my-2">
        <v-card-title style="font-size:30px">F1 Statistics</v-card-title>
      </v-card>
      <v-card v-if="standings!=null" class="card my-2">
        <v-tabs
          v-model="tab"
          grows
        >
          <v-tab :href="`#tab-1`">
            Drivers Standings
          </v-tab>
          <v-tab :href="`#tab-2`">
            Constructors Standings
          </v-tab>
          <v-tab :href="`#tab-3`">
            Races
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item :value="`tab-1`">
            <v-card-title>Current Drivers Standings</v-card-title>
            <v-data-table
              :loading="loading"
              :items="standings"
              :headers="standingHeaders"
            >
            </v-data-table>
          </v-tab-item>
          <v-tab-item :value="`tab-2`">
            <v-card-title>Current Constructors Standings</v-card-title>
            <v-data-table
              :loading="loading"
              :items="constructors"
              :headers="constructorsHeaders"
            >
            </v-data-table>
          </v-tab-item>
          <!--<v-tab-item :value="`tab-3`">
            <v-card-title>Races</v-card-title>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(race, i) in races"
                  :key="i"
                >
                  <v-expansion-panel-header>{{race.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                    <v-data-table
                      :loading="loading"
                      :items="race.results.drivers"
                      :headers="racesHeaders"
                    >
                    </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
          </v-tab-item>-->
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'F1 Statistics',
  data() {
    return {
      constructors: null,
      constructorsHeaders: [
        {text: 'Position', value: "position"},
        {text: 'Team Name', value: "team_name"},
        {text: 'Points', value: "points"},
      ],
      races: null,
      racesHeaders: [
        {text: 'Position', value: "position"},
        {text: 'Name', value: "name"},
        {text: 'Team', value: "team_name"},
        {text: 'Nationality', value: "nationality"},
        {text: 'Interval', value: 'interval'},
        {text: 'Stops', value: 'stops'},
        {text: 'Gap', value: "interval"},
      ],
      standings: null,
      standingHeaders: [
        {text: 'Position', value: "position"},
        {text: 'Name', value: "driver_name"},
        {text: 'Team', value: "team_name"},
        {text: 'Nationality', value: "nationality"},
        {text: 'Points', value: "points"},
      ],
      tab: "tab-1"
    }
  },
  mounted() {
    this.loading = true
    let me = this
    fetch("https://f1-live-motorsport-data.p.rapidapi.com/drivers/standings/2021", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "f1-live-motorsport-data.p.rapidapi.com",
        "x-rapidapi-key": "68d5b8df1bmsh086fee4794fdd89p15cb42jsn00cf4832d55f"
      }
    })
    .then(response => response.json())
    .then(data => {
      this.standings = data.results
    })
    .catch(err => {
      console.error(err);
    });
    fetch("https://f1-live-motorsport-data.p.rapidapi.com/constructors/standings/2021", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "f1-live-motorsport-data.p.rapidapi.com",
        "x-rapidapi-key": "68d5b8df1bmsh086fee4794fdd89p15cb42jsn00cf4832d55f"
      }
    })
    .then(response => response.json())
    .then(data => {
      this.constructors = data.results
    })
    .catch(err => {
      console.error(err);
    });
    fetch("https://f1-live-motorsport-data.p.rapidapi.com/races/2021", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "f1-live-motorsport-data.p.rapidapi.com",
        "x-rapidapi-key": "68d5b8df1bmsh086fee4794fdd89p15cb42jsn00cf4832d55f"
      }
    })
    .then(response => response.json())
    .then(data => {
      let sessions = []
      for(let i in data.results){
        for(let j in data.results[i].sessions){
          if(data.results[i].sessions[j].session_name == "Race" && data.results[i].status == "Complete"){
            sessions.push(data.results[i].sessions[j].id)
          }
        }
      }
      let races = []
      for(let k in sessions){
        fetch(`https://f1-live-motorsport-data.p.rapidapi.com/session/${sessions[k]}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "f1-live-motorsport-data.p.rapidapi.com",
            "x-rapidapi-key": "68d5b8df1bmsh086fee4794fdd89p15cb42jsn00cf4832d55f"
          }
        })
        .then(response => response.json())
        .then(data => {
          races.push(data.results)
        })
        .catch(err => {
          console.error(err);
        });
      }
      me.races = races
      this.loading = false
    })
    .catch(err => {
      console.error(err);
    });
  }
}
</script>

<style scoped>
</style>