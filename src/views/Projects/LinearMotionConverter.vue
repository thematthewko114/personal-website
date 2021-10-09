<template>
  <v-app>
    <v-container>
      <v-card class="card my-2">
        <v-card-title style="font-size:30px">Newton's Law of Motion</v-card-title>
      </v-card>
      <v-card class="card">
        <v-card-title>
          <v-card-title>Newton has 4 laws of motion, they are:</v-card-title>
          <v-card-title>1. 𝑠=((𝑢+𝑣)/2)𝑡</v-card-title>
          <v-card-title>2. 𝑣=𝑢+𝑎𝑡</v-card-title>
          <v-card-title>3. 𝑠=𝑢𝑡+1/2 𝑎𝑡^2</v-card-title>
          <v-card-title>4. 𝑣^2=𝑢^2+2𝑎𝑠</v-card-title>
        </v-card-title>
        <v-card-title>This converter will help you calculate the rest of the values you didn't input</v-card-title>
        <v-card-text>Enter the parameters</v-card-text>
        <v-select class="mx-4" label="u" disabled></v-select>
        <v-text-field class="mx-4" label="Enter the value" v-model="param1.value"></v-text-field>
        <v-select class="mx-4" :items="params" v-model="param2.param"></v-select>
        <v-text-field class="mx-4" label="Enter the value" v-model="param2.value"></v-text-field>
        <v-select class="mx-4" :items="params" v-model="param3.param"></v-select>
        <v-text-field class="mx-4" label="Enter the value" v-model="param3.value"></v-text-field>
        <v-btn class="mx-4" @click="convert" :disabled="param2.value == null || param3.value === null">Convert</v-btn>
        <v-card-text v-for="result in input" :key="result.text">{{result.text}}: {{result.value}}</v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  title: 'Linear Motion Converter',
  data() {
    return {
      input: {s: {text: "Displacement", value: null}, u: {text: "Initial Velocity", value: null}, v:{text: "Final Velocity", value: null}, a: {text: "Acceleration", value: null}, t: {text: "Time", value: null}},
      message: "Please input 3 or more input to the fields",
      invalid: 0,
      params: ["s", "v", "a", "t"],
      param1: {param: "u", value: null},
      param2: {param: "v", value: null},
      param3: {param: "a", value: null},
    }
  },
  methods: {
    convert(){
      let input = {s: {text: "Displacement", value: null}, u: {text: "Initial Velocity", value: null}, v:{text: "Final Velocity", value: null}, a: {text: "Acceleration", value: null}, t: {text: "Time", value: null}}
      input[this.param1.param].value = this.param1.value
      input[this.param2.param].value = this.param2.value
      input[this.param3.param].value = this.param3.value
      this.message= null
      if(input.u.value==input.v.value){
        input.a.value = 0
      }
      else if(input.v.value != null && input.a.value == 0){
        input.u.value = input.v.value
      }
      if(input.v.value == null && input.a.value == null){
        input.v.value = this.rule1({s: input.s.value, u: input.u.value, t: input.t.value})
        input.a.value = this.rule2({v: input.v.value, u: input.u.value, t: input.t.value})
      }
      else if(input.t.value == null && input.a.value == null){
        input.a.value = this.rule4({v: input.v.value, u: input.u.value, s: input.s.value})
        input.t.value = this.rule2({v: input.v.value, u: input.u.value, a: input.a.value})
      }
      else if(input.s.value == null && input.a.value == null){
        input.a.value = this.rule2({v: input.v.value, u: input.u.value, t: input.t.value})
        input.s.value = this.rule1({v: input.v.value, u: input.u.value, t: input.t.value})
      }
      else if(input.s.value == null && input.v.value == null){
        input.s.value = this.rule3({a: input.a.value, u: input.u.value, t: input.t.value})
        input.v.value = this.rule1({s: input.s.value, u: input.u.value, t: input.t.value})
      }
      else if(input.s.value == null && input.t.value == null){
        input.t.value = this.rule2({a: input.a.value, u: input.u.value, v: input.v.value})
        input.s.value = this.rule3({a: input.a.value, u: input.u.value, t: input.t.value})
      }
      else if(input.v.value == null && input.t.value == null){
        input.v.value = this.rule4({a: input.a.value, u: input.u.value, s: input.s.value})
        input.t.value = this.rule2({a: input.a.value, u: input.u.value, v: input.v.value})
      }
      this.input = input
    },
    rule1(obj){
      if(obj.v == undefined){
        let v = obj.s/obj.t*2-obj.u
        return v
      }
      else if(obj.s == undefined){
        let s = (obj.u+obj.v)/2*obj.t
        return s
      }
      else if(obj.t == undefined){
        let t = obj.s*2/(obj.u+obj.v)
        return t
      }
    },
    rule2(obj){
      if(obj.v == undefined){
        let v = obj.u + obj.a*obj.t
        return v
      }
      else if(obj.a == undefined){
        let a = (obj.v-obj.u)/obj.t
        return a
      }
      else if(obj.t == undefined){
        let t = (obj.v-obj.u)/obj.a
        return t
      }
    },
    rule3(obj){
      if(obj.s == undefined){
        let s = obj.u*obj.t+1/2*(obj.a*(obj.t*obj.t))
        return s
      }
      else if(obj.a == undefined){
        let a = (obj.s-obj.u*obj.t)/(obj.t*obj.t)
        return a
      }
      else if(obj.t == undefined){
        let a = obj.a/2
        let b = obj.u
        let c = obj.s*(-1)
        let discriminant = b*b - 4*a*c
        let result1 = (-b+Math.sqrt(discriminant))/2/a
        let result2 = (-b-Math.sqrt(discriminant))/2/a
        if(result1<0){
          return result2
        }
        else{
          return result1
        }
      }
    },
    rule4(obj){
      if(obj.v == undefined){
        let v = Math.sqrt((obj.u*obj.u)+2*obj.a*obj.s)
        return v
      }
      else if(obj.a == undefined){
        let a = ((obj.v*obj.v)-(obj.u*obj.u))/2/obj.s
        return a
      }
      else if(obj.s == undefined){
        let s = ((obj.v*obj.v)-(obj.u*obj.u))/(2*obj.a)
        return s
      }
    }
  }
}
</script>
