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
        <v-card-text v-if="!events.length" class="card">
          <v-icon left>mdi-alert-outline</v-icon>
          No Data Available
        </v-card-text>
        <v-sheet
          v-if="events.length"
          tile
          height="54"
          class="d-flex my-2 card"
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
          @click:event="showEvent"
        >
        </v-calendar>
        <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
          <v-card
            color="card"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon @click="deleteEvent(selectedEvent.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>Start time: {{selectedEvent.start}}</v-card-text>
            <v-card-text>End time: {{selectedEvent.end}}</v-card-text>
              <v-card-text v-if="selectedEvent.color == 'red'">Completion: Incomplete</v-card-text>
              <v-card-text v-if="selectedEvent.color == 'orange'">Completion: In progress</v-card-text>
              <v-card-text v-if="selectedEvent.color == 'green'">Completion: Completed</v-card-text>
            <v-card-text>Notes: {{selectedEvent.content}}</v-card-text>
            <v-card-actions>
              <v-btn
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-card>
      <v-card class="card">
        <v-card-title>It is currently: </v-card-title>
        <div class="clock">
          <vue-clock class="ml-4"/>
        </div>
        <v-card-title>And your progress looks like:</v-card-title>
        <v-expansion-panels>
          <v-expansion-panel v-for="event in todayEvents" :key="event.id">
            <v-expansion-panel-header v-if="event.color=='red'">
              <v-icon left color="red">mdi-progress-alert</v-icon>
              <v-card-text>{{event.name}}</v-card-text>
            </v-expansion-panel-header>
            <v-expansion-panel-header v-if="event.color=='orange'">
              <v-icon left color="orange">mdi-progress-clock</v-icon>
              <v-card-text>{{event.name}}</v-card-text>
            </v-expansion-panel-header>
            <v-expansion-panel-header v-if="event.color=='green'">
              <v-icon left color="green">mdi-progress-check</v-icon>
              <v-card-text>{{event.name}}</v-card-text>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card-text>Period: {{event.start}} - {{event.end}}</v-card-text>
              <v-card-text>Notes: {{event.content}}</v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        
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
    <v-snackbar
      v-model="snackbar"
      timeout=5000
      bottom
      right
    >
      Item Deleted
    </v-snackbar>
  </v-app>
</template>

<script>
import VueClock from '@dangvanthanh/vue-clock';
import moment from 'moment-timezone'
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
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      ],
      value: '',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      snackbar: false,
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
        id: this.makeid(20),
        name: this.title, 
        start: this.date + ' ' + this.startingTime, 
        end: this.date + ' ' + this.endTime, 
        content: this.content,
        color: "red"
      }
      this.$store.dispatch('addEvent', {old: this.events, new: obj})
      this.title = this.content = ''
      this.date = this.startingTime = this.endTime = null
      this.addDialog = false
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    deleteEvent(id){
      this.$store.dispatch('deleteEvent', id)
      this.snackbar = true
      this.selectedOpen = false
    },
    makeid(length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random()*charactersLength));
      }
      return result;
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
    },
    todayEvents(){
      let date = moment().tz("Asia/Hong_Kong").format().slice(0, 10)
      let array = []
      let events = JSON.parse(JSON.stringify(this.events))
      for(let i in this.events){
        if(events[i].start.includes(date) || events[i].end.includes(date)){
          array.push(this.events[i])
        }
      }
      return array
    }
  },
}
</script>

<style scoped>
</style>