<template>
  <v-app>
    <v-container>
      <v-card class="card my-2">
        <v-card-title style="font-size:30px">Google Maps embedded in Vue component</v-card-title>
      </v-card>
      <v-card>
        <GmapMap
        ref="mapRef"
        :center="{lat:22.4424, lng:114.1655}"
        :zoom="15"
        style="width: 100%; height: 300px"
        ></GmapMap>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Map',
  data() {
    return {
    }
  },
  mounted(){
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({lat:22.455, lng:114.17})
    })
  }
}
</script>

<style scoped>
</style>