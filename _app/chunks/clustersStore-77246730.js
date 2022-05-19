var B=Object.defineProperty,F=Object.defineProperties;var q=Object.getOwnPropertyDescriptors;var $=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var A=(e,t,s)=>t in e?B(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,g=(e,t)=>{for(var s in t||(t={}))W.call(t,s)&&A(e,s,t[s]);if($)for(var s of $(t))K.call(t,s)&&A(e,s,t[s]);return e},m=(e,t)=>F(e,q(t));import{d as k,w as G}from"./paths-3b0ebf9b.js";var z=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function J(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var E={exports:{}};(function(e){var t=(()=>{var s=Object.defineProperty,u=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable,l=(_,o,n)=>o in _?s(_,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):_[o]=n,p=(_,o)=>{for(var n in o||(o={}))h.call(o,n)&&l(_,n,o[n]);if(u)for(var n of u(o))w.call(o,n)&&l(_,n,o[n]);return _},c=_=>s(_,"__esModule",{value:!0}),C=(_,o)=>{c(_);for(var n in o)s(_,n,{get:o[n],enumerable:!0})},y={};C(y,{DEFAULT_UUID_LENGTH:()=>v,default:()=>I});var D="4.4.4",v=6,M={dictionary:"alphanum",shuffle:!0,debug:!1,length:v},U=class extends Function{constructor(_={}){super(),this.dictIndex=0,this.dictRange=[],this.lowerBound=0,this.upperBound=0,this.dictLength=0,this._digit_first_ascii=48,this._digit_last_ascii=58,this._alpha_lower_first_ascii=97,this._alpha_lower_last_ascii=123,this._hex_last_ascii=103,this._alpha_upper_first_ascii=65,this._alpha_upper_last_ascii=91,this._number_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii]},this._alpha_dict_ranges={lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii],upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._alpha_lower_dict_ranges={lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii]},this._alpha_upper_dict_ranges={upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._alphanum_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii],lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii],upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._alphanum_lower_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii],lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii]},this._alphanum_upper_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii],upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._hex_dict_ranges={decDigits:[this._digit_first_ascii,this._digit_last_ascii],alphaDigits:[this._alpha_lower_first_ascii,this._hex_last_ascii]},this.log=(...i)=>{const a=[...i];if(a[0]=`[short-unique-id] ${i[0]}`,this.debug===!0&&typeof console!="undefined"&&console!==null)return console.log(...a)},this.setDictionary=(i,a)=>{let r;if(i&&Array.isArray(i)&&i.length>1)r=i;else{r=[];let d;this.dictIndex=d=0;const f=`_${i}_dict_ranges`,b=this[f];Object.keys(b).forEach(j=>{const N=j;for(this.dictRange=b[N],this.lowerBound=this.dictRange[0],this.upperBound=this.dictRange[1],this.dictIndex=d=this.lowerBound;this.lowerBound<=this.upperBound?d<this.upperBound:d>this.upperBound;this.dictIndex=this.lowerBound<=this.upperBound?d+=1:d-=1)r.push(String.fromCharCode(this.dictIndex))})}a&&(r=r.sort(()=>Math.random()-.5)),this.dict=r,this.dictLength=this.dict.length,this.counter=0},this.seq=()=>this.sequentialUUID(),this.sequentialUUID=()=>{let i,a,r="";i=this.counter;do a=i%this.dictLength,i=Math.trunc(i/this.dictLength),r+=this.dict[a];while(i!==0);return this.counter+=1,r},this.randomUUID=(i=this.uuidLength||v)=>{let a,r,d;if(i===null||typeof i=="undefined"||i<1)throw new Error("Invalid UUID Length Provided");for(a="",d=0;d<i;d+=1)r=parseInt((Math.random()*this.dictLength).toFixed(0),10)%this.dictLength,a+=this.dict[r];return a},this.availableUUIDs=(i=this.uuidLength)=>parseFloat(Math.pow([...new Set(this.dict)].length,i).toFixed(0)),this.approxMaxBeforeCollision=(i=this.availableUUIDs(this.uuidLength))=>parseFloat(Math.sqrt(Math.PI/2*i).toFixed(20)),this.collisionProbability=(i=this.availableUUIDs(this.uuidLength),a=this.uuidLength)=>parseFloat((this.approxMaxBeforeCollision(i)/this.availableUUIDs(a)).toFixed(20)),this.uniqueness=(i=this.availableUUIDs(this.uuidLength))=>{const a=parseFloat((1-this.approxMaxBeforeCollision(i)/i).toFixed(20));return a>1?1:a<0?0:a},this.getVersion=()=>this.version,this.stamp=i=>{if(typeof i!="number"||i<10)throw new Error("Param finalLength must be number greater than 10");const a=Math.floor(+new Date/1e3).toString(16),r=i-9,d=Math.round(Math.random()*(r>15?15:r)),f=this.randomUUID(r);return`${f.substr(0,d)}${a}${f.substr(d)}${d.toString(16)}`},this.parseStamp=i=>{if(i.length<10)throw new Error("Stamp length invalid");const a=parseInt(i.substr(i.length-1,1),16);return new Date(parseInt(i.substr(a,8),16)*1e3)};const o=p(p({},M),_);this.counter=0,this.debug=!1,this.dict=[],this.version=D;const{dictionary:n,shuffle:O,length:T}=o;return this.uuidLength=T,this.setDictionary(n,O),this.debug=o.debug,this.log(this.dict),this.log(`Generator instantiated with Dictionary Size ${this.dictLength}`),new Proxy(this,{apply:(i,a,r)=>this.randomUUID(...r)})}},I=U;return I.default=U,y})();e.exports=t.default,typeof window!="undefined"&&(t=t.default)})(E);var Y=J(E.exports);const L="uiForApacheKafkaWizard",Q={clusterName:"",readonly:!1,bootstrapServers:[{host:"",port:9092}],sharedConfluentCloudCluster:!1,securedWithSSL:!1,selfSignedCA:!1,selfSignedCATruststoreLocation:void 0,selfSignedCATruststorePassword:void 0,authMethod:"None",saslJaasConfig:void 0,saslMechanism:void 0,sslTruststoreLocation:void 0,sslTruststorePassword:void 0,sslKeystoreLocation:void 0,sslKeystorePassword:void 0,useSpecificIAMProfile:!1,IAMProfile:void 0,schemaRegistryEnabled:!1,schemaRegistryURL:void 0,schemaRegistrySecuredWithAuth:!1,schemaRegistryUsername:void 0,schemaRegistryPassword:void 0,kafkaConnects:[{name:"",url:"",securedWithAuth:!1,username:void 0,password:void 0}],jmxEnabled:!1,jmxPort:void 0,jmxSSL:!1,jmxSSLTruststoreLocation:void 0,jmxSSLTruststorePassword:void 0,jmxSSLKeystoreLocation:void 0,jmxSSLKeystorePassword:void 0,jmxSecuredWithAuth:!1,jmxUsername:void 0,jmxPassword:void 0},x=new Y({length:6});let R=[];try{const e=localStorage.getItem(L);e&&(R=JSON.parse(e))}catch{}const{update:S,subscribe:H}=G(R),P={subscribe:H,addNew:e=>S(t=>[...t,m(g({},e),{id:x()})]),copy:e=>{const t=x();return S(s=>{const u=s.find(({id:h})=>h===e);if(u){const h=`${u.clusterName}_${x()}`;return[...s,m(g({},u),{id:t,clusterName:h})]}return s}),t},remove:e=>S(t=>t.filter(s=>s.id!==e)),update:(e,t)=>S(s=>s.map(u=>u.id===e?m(g({},t),{id:e}):u))};P.subscribe(e=>{localStorage[L]=JSON.stringify(e)});const Z=k(P,e=>{const t=["docker run -p 8080:8080","-d provectuslabs/kafka-ui:latest"];return e.forEach((s,u)=>{const h=`-e KAFKA_CLUSTERS_${u}`;t.push(`${h}_NAME=${s.clusterName}`),s.readonly&&t.push(`${h}_READONLY=${s.readonly}`);const w=s.bootstrapServers.map(({host:l,port:p})=>`${l}:${p}`).join(",");if(t.push(`${h}_BOOTSTRAPSERVERS=${w}`),s.schemaRegistryEnabled&&(t.push(`${h}_SCHEMAREGISTRY=${s.schemaRegistryURL}`),s.schemaRegistrySecuredWithAuth)){const l=`${h}_SCHEMAREGISTRYAUTH`;t.push(`${l}_USERNAME=${s.schemaRegistryUsername}`),t.push(`${l}_PASSWORD=${s.schemaRegistryPassword}`)}s.kafkaConnects.forEach((l,p)=>{const c=`${h}_KAFKACONNECT_${p}`;t.push(`${c}_NAME=${l.name}`),t.push(`${c}_ADDRESS=${l.url}`),l.securedWithAuth&&(t.push(`${c}_USERNAME=${l.username}`),t.push(`${c}_PASSWORD=${l.password}`))}),s.jmxEnabled&&(t.push(`${h}_JMXPORT=${s.jmxPort}`),s.jmxSSL&&t.push(`${h}_JMXSSL=${s.jmxSSL}`),s.jmxSecuredWithAuth&&(t.push(`${h}_JMXUSERNAME=${s.jmxUsername}`),t.push(`${h}_JMXPASSWORD=${s.jmxPassword}`)))}),t});export{Q as N,z as a,P as c,Z as d};