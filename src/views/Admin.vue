<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title>Admin</v-card-title>
      </v-card>
      <v-card class="card my-2">
        <v-card-title>Database Update</v-card-title>
        <v-text-field v-model="node" class="ma-4" label="Enter Node (/...)"></v-text-field>
        <v-btn class="ma-4" @click="load">Load node</v-btn>
        <v-btn class="ma-4" @click="getField" v-if="!fields">Preview</v-btn>
        <v-btn class="ma-4" @click="fields=null" v-if="fields">Hide</v-btn>
        <v-btn class="ma-4" @click="getKeys">Load Add Tab</v-btn>
        <json-viewer 
          v-if="fields"
          :value="fields"
          copyable
          boxed>
        </json-viewer>
        <div v-if="requiredFields">
          <v-card-title>Required Fields</v-card-title>
          <v-text-field class="mx-4" v-for="fields in requiredFields" :key="fields" v-model="obj[fields]" :label="fields">{{fields}}</v-text-field>
          <v-card-title>Optional Fields</v-card-title>
          <v-text-field class="mx-4" v-for="fields in optionalFields" :key="fields" v-model="obj[fields]" :label="fields">{{fields}}</v-text-field>
          <v-btn color="green" @click="add" class="ma-4">add</v-btn>
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Admin',
  data() {
    return {
      node: '',
      fields: null,
      requiredFields: null,
      optionalFields: null,
      obj: {}
    }
  },
  methods:{
    getField(){
      this.fields = this.$store.getters.fields
    },
    getKeys(){
      let fields = JSON.parse(JSON.stringify(this.fields))
      let allKeys = []
      let requiredFields = []
      let optionalFields = []
      for(let i in fields){
        allKeys.push(Object.keys(fields[i]))
      }
      allKeys.sort(function(a, b){
        return b.length - a.length;
      })
      requiredFields = allKeys[allKeys.length-1]
      optionalFields = allKeys[0]
      for(let l in optionalFields){
        this.obj[optionalFields[l]] = null
      }
      for(let j in requiredFields){
        for(let k in optionalFields){
          if(requiredFields[j] == optionalFields[k]){
            optionalFields.splice(k, 1)
          }
        }
      }
      this.requiredFields = requiredFields
      this.optionalFields = optionalFields
    },
    load(){
      this.$store.dispatch('getFields', this.node)
    },
    add(){
      this.$store.dispatch('addData', {data: this.obj, node: this.node})
    }
  }
}
</script>

<style>

</style>