(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cef21"],{"622a":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-container",[a("v-card",{staticClass:"card my-2"},[a("v-card-title",{staticStyle:{"font-size":"30px"}},[t._v("Covid Cases")])],1),a("v-card",{staticClass:"card my-2"},[a("v-text-field",{staticClass:"ma-4",staticStyle:{width:"300px"},attrs:{label:"Enter a country name"},model:{value:t.country,callback:function(e){t.country=e},expression:"country"}}),a("v-btn",{staticClass:"ma-2",on:{click:t.addCountry}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-plus")]),t._v("Add Country")],1),t.items!=[]?a("v-data-table",{attrs:{items:t.items,headers:t.headers}}):t._e()],1)],1)],1)},r=[],d={title:"Covid Report",data(){return{country:null,date:"",items:[],headers:[{text:"Country",value:"country"},{text:"Confirmed Cases",value:"confirmed"},{text:"Deaths",value:"deaths"},{text:"Critical",value:"critical"},{text:"Recovered",value:"recovered"},{text:"Death Percentage",value:"percentage"}]}},methods:{addCountry(){fetch("https://covid-19-data.p.rapidapi.com/country?name="+this.country,{method:"GET",headers:{"x-rapidapi-host":"covid-19-data.p.rapidapi.com","x-rapidapi-key":"68d5b8df1bmsh086fee4794fdd89p15cb42jsn00cf4832d55f"}}).then(t=>t.json()).then(t=>{let e=t[0].deaths/t[0].confirmed*100;t[0].percentage=e.toFixed(4)+"%",this.items.push(t[0])}).catch(t=>{console.error(t)})}},mounted(){let t=(new Date).getUTCDate(),e=parseInt((new Date).getMonth())+1,a=(new Date).getFullYear();this.date=t+"-"+e+"-"+a}},c=d,s=a("2877"),i=a("6544"),o=a.n(i),l=a("7496"),u=a("8336"),p=a("b0af"),v=a("99d9"),h=a("a523"),m=a("8fea"),f=a("132d"),C=a("8654"),y=Object(s["a"])(c,n,r,!1,null,"d1ee836e",null);e["default"]=y.exports;o()(y,{VApp:l["a"],VBtn:u["a"],VCard:p["a"],VCardTitle:v["d"],VContainer:h["a"],VDataTable:m["a"],VIcon:f["a"],VTextField:C["a"]})}}]);
//# sourceMappingURL=chunk-2d0cef21.05d9e523.js.map