(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18202130"],{"0470":function(t,e,s){},4012:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{staticClass:"center"},[s("v-container",[s("v-card",[s("v-btn",{staticClass:"my-4 grey",attrs:{to:"/projects"}},[t._v("Return to Projects")]),s("h1",[t._v("Reaction Timer")]),s("v-btn",{staticClass:"px-2 my-4 green",attrs:{disabled:t.isPlaying},on:{click:t.start}},[t._v("Play")])],1),t.isPlaying?s("Block",{attrs:{delay:t.delay},on:{end:t.endGame}}):t._e(),t.showResults?s("Result",{attrs:{score:t.score}}):t._e()],1)],1)},n=[],i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.showBlock?s("div",{staticClass:"block",on:{click:t.stopTimer}},[t._v(" Click ")]):t._e()},r=[],l={props:["delay"],data(){return{showBlock:!1,timer:null,reactionTime:0}},methods:{startTimer(){this.timer=setInterval(()=>{this.reactionTime+=10},10)},stopTimer(){clearInterval(this.timer),this.$emit("end",this.reactionTime)}},mounted(){setTimeout(()=>{this.showBlock=!0,this.startTimer()},this.delay)}},o=l,c=(s("424a"),s("2877")),u=Object(c["a"])(o,i,r,!1,null,null,null),h=u.exports,m=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-card",[s("h2",[t._v(t._s(t.rank))]),s("p",[t._v("Reaction Time: "+t._s(t.score)+" milliseconds")])])},d=[],p={props:["score"],data(){return{rank:null}},mounted(){this.score<250?this.rank="Reactions of a Cat!":this.score<500||this.score<750?this.rank="Alright!":this.rank="Get some help"}},v=p,f=s("6544"),k=s.n(f),_=s("b0af"),y=Object(c["a"])(v,m,d,!1,null,null,null),b=y.exports;k()(y,{VCard:_["a"]});var w={title:"Reaction Timer",components:{Block:h,Result:b},data(){return{isPlaying:!1,delay:null,score:null,showResults:!1}},methods:{start(){this.isPlaying=!0,this.showResults=!1,this.delay=2e3+4e3*Math.random()},endGame(t){this.score=t,this.isPlaying=!1,this.showResults=!0}}},R=w,T=(s("6c05"),s("7496")),C=s("8336"),g=s("a523"),P=Object(c["a"])(R,a,n,!1,null,"ef36b838",null);e["default"]=P.exports;k()(P,{VApp:T["a"],VBtn:C["a"],VCard:_["a"],VContainer:g["a"]})},"424a":function(t,e,s){"use strict";s("8c4fb")},"6c05":function(t,e,s){"use strict";s("0470")},"8c4fb":function(t,e,s){}}]);
//# sourceMappingURL=chunk-18202130.d2f51adf.js.map