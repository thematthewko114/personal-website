<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title>File Reader</v-card-title>
      </v-card>
      <v-card>
        <v-data-table
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
  title: 'File Reader',
  data() {
    return {
      items: [
        {id: 1},
        {id: 2}
      ],
      headers: [
        {text: 'id', value: 'id'}
      ]
    }
  },
}
</script>

<style>

</style>