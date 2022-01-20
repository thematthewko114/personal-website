<template>
  <v-app>
    <v-container>
      <v-card class="card my-2">
        <v-card-title>Data Structures Visualizer</v-card-title>
      </v-card>
      <v-card class="card">
        <v-card-title>Stacks</v-card-title>
        <v-card-subtitle class="ma-4">[<v-chip v-for="item in stack.elements" :key="item">{{item}}</v-chip>]</v-card-subtitle>
        <v-text-field type="text" class="mx-4" v-model="pushItem" label="Enter number or string"></v-text-field>
        <v-card-subtitle>Size: {{stack.size}}</v-card-subtitle>
        <v-btn @click="push(pushItem)" :disabled="pushItem==null" class="ma-2">Push</v-btn>
        <v-btn @click="pop" class="ma-2" :disabled="stack.size==0">Pop</v-btn>
      </v-card>
      <v-card class="card my-2">
        <v-card-title>Queues</v-card-title>
        <v-card-subtitle class="ma-4">[<v-chip v-for="item in queue.elements" :key="item">{{item}}</v-chip>]</v-card-subtitle>
        <v-text-field type="text" class="mx-4" v-model="pushItem2" label="Enter number or string"></v-text-field>
        <v-card-subtitle>Size: {{queue.size}}</v-card-subtitle>
        <v-btn @click="enqueue(pushItem2)" :disabled="pushItem2==null" class="ma-2">Enqueue</v-btn>
        <v-btn @click="dequeue" class="ma-2" :disabled="queue.size==0">Dequeue</v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: "Data Structures Visualizer",
  data() {
    return {
      stack: {
        elements: [],
        size: 0
      },
      queue: {
        elements: [],
        size: 0
      },
      pushItem: null,
      pushItem2: null
    }
  },
  methods: {
    push(item){
      this.stack.elements.push(item)
      this.stack.size++
      this.pushItem = null
    },
    pop(){
      this.stack.elements.pop()
      this.stack.size--
    },
    enqueue(item){
      this.queue.elements.push(item)
      this.queue.size++
      this.pushItem2 = null
    },
    dequeue(){
      this.queue.elements.splice(0, 1)
      this.queue.size--
    }
  },
  computed: {
    size(arr){
      return arr.length
    }
  }
}
</script>

<style>

</style>