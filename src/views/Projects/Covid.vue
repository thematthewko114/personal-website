<template>
  <v-app>
    <v-container>
      <v-card class="card my-2">
        <v-card-title style="font-size:30px">Covid Cases</v-card-title>
      </v-card>
      <v-card class="card my-2">
        <v-text-field class="ma-4" v-model="country" style="width:300px" label="Enter a country name"></v-text-field>
        <v-btn @click="addCountry" class="ma-2"><v-icon left>mdi-plus</v-icon>Add Country</v-btn>
        <v-data-table
          v-if="items!=[]"
          :items="items"
          :headers="headers"
        >
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Covid Report',
  data() {
    return {
      country: null,
      date: "",
      items: [],
      headers: [
        {text: "Country", value: "country"},
        {text: "Confirmed Cases", value: "confirmed"},
        {text: "Deaths", value: "deaths"},
        {text: "Critical", value: "critical"},
        {text: "Recovered", value: "recovered"},
        {text: "Death Percentage", value: "percentage"},
      ]
    }
  },
  methods: {
    addCountry(){
      fetch(`https://covid-19-data.p.rapidapi.com/country?name=${this.country}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key": "68d5b8df1bmsh086fee4794fdd89p15cb42jsn00cf4832d55f"
        }
      })
      .then(response => response.json())
      .then(data => {
        let percentage = (data[0].deaths/data[0].confirmed)*100
        data[0].percentage = percentage.toFixed(4) + "%"
        this.items.push(data[0])
      })
      .catch(err => {
        console.error(err);
      });
    }
  },
  mounted() {
    let day = new Date().getUTCDate()
    let month = parseInt(new Date().getMonth())+1
    let year = new Date().getFullYear()
    this.date = day+"-"+month+"-"+year
  },
}
</script>

<style scoped>
</style>