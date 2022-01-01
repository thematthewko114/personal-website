<template>
  <v-app>
    <v-container>
      <v-card class="card">
        <v-card-title><strong><u>Revision Progress Tracker: Dashboard</u></strong>
          <v-spacer></v-spacer>
          <v-btn @click="logout" color="red">Log out</v-btn>
        </v-card-title>
      </v-card>
      <v-card class="my-2 card">
        <v-card-title>Your Calendar
          <v-spacer></v-spacer>
          <v-btn @click="addDialog=true" color="green">Add Event</v-btn>
        </v-card-title>
        <v-sheet
          tile
          height="54"
          class="d-flex my-2"
        >
          <v-btn
            icon
            class="ma-2"
            @click="$refs.calendar.prev()"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            class="ma-2"
            label="type"
          ></v-select>
          <v-select
            v-model="mode"
            :items="modes"
            dense
            outlined
            hide-details
            label="event-overlap-mode"
            class="ma-2"
          ></v-select>
          <v-select
            v-model="weekday"
            :items="weekdays"
            dense
            outlined
            hide-details
            label="weekdays"
            class="ma-2"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn
            icon
            class="ma-2"
            @click="$refs.calendar.next()"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-calendar
          v-if="events.length"
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
        ></v-calendar>
      </v-card>
      <v-card class="card">
        <v-card-title>It is currently: </v-card-title>
        <div class="clock">
          <vue-clock class="ml-4"/>
        </div>
        <v-card-title>And your progress looks like:</v-card-title>
      </v-card>
    </v-container>
    <v-dialog v-model="addDialog" width="1000px">
      <v-card class="card">
        <v-container>
          <v-card-title><strong>Add Subject</strong></v-card-title>
          <v-divider></v-divider>
          <v-form>
            <v-text-field 
              v-model="title" 
              label="Event title" 
              class="ma-4"
              required
            ></v-text-field>
            <v-card-title>Pick a date</v-card-title>
            <v-date-picker
              v-model="date"
              class="ma-4"
            ></v-date-picker>
            <v-card-title>Pick start time</v-card-title>
            <v-time-picker
              v-model="startingTime"
              class="ma-4"
            ></v-time-picker>
            <v-card-title>Pick end time</v-card-title>
            <v-time-picker
              v-model="endTime"
              class="ma-4"
            ></v-time-picker>
            <v-textarea
              v-model="content" 
              label="Notes"
              class="ma-4"
            ></v-textarea>
            <v-btn color="green" @click="addEvent" class="mx-2" :disabled="date == null || startingTime == null || endTime == null || title==''">Submit</v-btn>
            <v-btn @click="addDialog=false" class="mx-2">Close</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import VueClock from '@dangvanthanh/vue-clock';
export default {
  title: 'Revision Progress Tracker',
  components: { VueClock },
  data() {
    return {
      show1: false,
      addDialog: false,
      title: '',
      content: '',
      date: null,
      startingTime: null,
      endTime: null,
      type: 'month',
      types: ['month', 'week', 'day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      ],
      value: '',
    }
  },
  methods: {
    signUpUser(){
      this.$store.dispatch('signUserUp', {
        username: this.email,
        password: this.password
      })
    },
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/projects/revisionprogress')
    },
    addEvent(){
      let obj = {
        name: this.title, 
        start: this.date + ' ' + this.startingTime, 
        end: this.date + ' ' + this.endTime, 
        completion: 0, //0: incomplete, 1: completed, 2: in progress
        content: this.content
      }
      this.$store.dispatch('addEvent', {old: this.events, new: obj})
      this.title = this.content = ''
      this.date = this.startingTime = this.endTime = null
      this.addDialog = false
    }
  },
  computed:{
    passwordMatch(){
      if(this.password.length<8 || this.email.length<8){
        return false
      }
      return this.password2 == this.password
    },
    events(){
      return this.$store.getters.events
    }
  }
}
</script>

<style scoped>
</style>