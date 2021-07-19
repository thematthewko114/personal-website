<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title style="font-size:30px">File Reader<v-spacer></v-spacer><v-btn icon to="/projects"><v-icon>mdi-arrow-left</v-icon></v-btn></v-card-title>
      </v-card>
      <v-card>
        <v-container>
          <p>Instruction: Upload an Excel or CSV file which contains headers for each column for the browser to read the table</p>
          <v-file-input class="mx-4" accept=".xlsx" style="width:300px" label="Upload Excel file" v-model="excelFile"></v-file-input>
          <v-file-input class="mx-4" accept=".csv" style="width:300px" label="Upload CSV file" v-model="csvFile"></v-file-input>
          <p v-if="excelFile" class="mx-4">File size: {{excelFile.size/1000}} kB</p>
          <p v-if="csvFile" class="mx-4">File size: {{csvFile.size/1000}} kB</p>
          <p v-if="items.length" class="mx-4">Number of rows: {{items.length}}</p>
          <v-card-actions v-if="items.length">
            <download-csv :data="items" name="output.csv">
              <v-btn class="ma-4" color="grey">Download CSV</v-btn>
            </download-csv>
            <download-excel :data="items" name="output.xls">
              <v-btn class="mx-4" color="grey">Download Excel</v-btn>
            </download-excel>
          </v-card-actions>
          <v-data-table
            :items="items"
            :headers="headers"
          >
          </v-data-table>
        </v-container>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import readXlsxFile from 'read-excel-file'
export default { 
  title: 'File Reader',
  data() {
    return {
      csvFile: null,
      excelFile: null,
      headers: [],
      items: []
    }
  },
  methods: {
    getCsvData(){
      let me = this
      this.excelFile = null
      me.items = []
      me.headers = []
      me.$papa.parse(me.csvFile, {
        header: true,
        worker: true,
        step: function(row){
          me.items.push(row.data)
        },
        complete: function(){
          let keys = Object.keys(me.items[0])
          for(let i in keys){
            me.headers.push({text: keys[i], value: keys[i]})
          }
          me.items.pop()
        }
      })
    },
    getExcelData(){
      let me = this
      this.csvFile = null
      this.items = []
      this.headers = []
      let schema = {}
      readXlsxFile(this.excelFile)
      .then((rows) => {
        let headers = rows[0]
        for(let i in headers){
          schema[headers[i]] = {prop: headers[i]}
          me.headers.push({text: headers[i], value: headers[i]})
        }
        readXlsxFile(this.excelFile, {schema})
        .then(({rows, errors}) => {
          errors.length === 0
          me.items = rows
        })
      })
    }
  },
  watch:{
    csvFile(){
      this.getCsvData()
    },
    excelFile(){
      this.getExcelData()
    }
  }
}
</script>

<style>

</style>