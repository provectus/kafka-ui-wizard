import{S as D,i as U,s as K,e as C,I as N,k as H,t as W,c as O,a as $,J as w,d as S,m as J,h as G,b as p,g as x,K as d,L as V,j as X,E as T,l as y,o as E,p as q,q as h,N as P,n as F,w as g,x as b,y as v,B as M}from"../chunks/index-6d63b2ef.js";import{H as Z}from"../chunks/Hero-7ccbdea1.js";import{c as Y}from"../chunks/clustersStore-70511e5d.js";import{d as I}from"../chunks/paths-b8e67251.js";function z(i){let e,o,s,t,a,r,_,n,u;return{c(){e=C("div"),o=C("button"),s=N("svg"),t=N("path"),a=H(),r=C("pre"),_=W(i[0]),this.h()},l(c){e=O(c,"DIV",{class:!0});var l=$(e);o=O(l,"BUTTON",{class:!0});var A=$(o);s=w(A,"svg",{class:!0,xmlns:!0,viewBox:!0});var R=$(s);t=w(R,"path",{d:!0}),$(t).forEach(S),R.forEach(S),A.forEach(S),a=J(l),r=O(l,"PRE",{class:!0});var f=$(r);_=G(f,i[0]),f.forEach(S),l.forEach(S),this.h()},h(){p(t,"d","M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257813 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z"),p(s,"class","w-5 h-5 fill-current"),p(s,"xmlns","http://www.w3.org/2000/svg"),p(s,"viewBox","0 0 32 32"),p(o,"class","btn btn-square btn-sm absolute top-3 right-5"),p(r,"class","px-6 before:mr-0"),p(e,"class","mockup-code text-sm mb-5 max-h-[500px] overflow-y-auto")},m(c,l){x(c,e,l),d(e,o),d(o,s),d(s,t),d(e,a),d(e,r),d(r,_),n||(u=V(o,"click",i[1]),n=!0)},p(c,[l]){l&1&&X(_,c[0])},i:T,o:T,d(c){c&&S(e),n=!1,u()}}}function Q(i,e,o){let{code:s}=e;const t=()=>{navigator.clipboard.writeText(s).then(()=>console.log("copied"),a=>console.log("Error",a))};return i.$$set=a=>{"code"in a&&o(0,s=a.code)},[s,t]}class j extends D{constructor(e){super(),U(this,e,Q,z,K,{code:0})}}const B=I(Y,i=>{const e={},o=[],s=[];return i.forEach((t,a)=>{const r=`KAFKA_CLUSTERS_${a}`;e[`${r}_NAME`]=t.clusterName,t.readonly&&(e[`${r}_READONLY`]="true"),t.sharedConfluentCloudCluster&&(e[`${r}_DISABLELOGDIRSCOLLECTION`]="true");const _=t.bootstrapServers.map(({host:m,port:k})=>`${m}:${k}`).join(",");e[`${r}_BOOTSTRAPSERVERS`]=_,t.securedWithSSL&&(e[`${r}_PROPERTIES_SECURITY_PROTOCOL`]="SSL");const n=`${r}_PROPERTIES_SSL`,{truststoreLocation:u,truststorePassword:c,keystoreLocation:l,keystorePassword:A,keystoreKeyPassword:R}=t.selfSignedCASsl;e[`${n}_TRUSTSTORE_LOCATION`]=u,e[`${n}_TRUSTSTORE_PASSWORD`]=c,e[`${n}_KEYSTORE_LOCATION`]=l,e[`${n}_KEYSTORE_PASSWORD`]=A,e[`${n}_KEYSTORE_KEY_PASSWORD`]=R,t.authMethod!=="None"&&(e[`${r}_PROPERTIES_SECURITY_PROTOCOL`]=t.authMethod);const f=`${r}_PROPERTIES_SASL`;if(t.authMethod==="SASL_PLAINTEXT"&&(e[`${f}_MECHANISM`]="PLAIN"),e[`${f}_MECHANISM`]=t.saslMechanism,e[`${f}_KERBEROS_SERVICE_NAME`]=t.kerberosServiceName,e[`${f}_JAAS_CONFIG`]=t.saslJaasConfig,t.saslMechanism==="AWS_MSK_IAM"&&(e[`${f}_CLIENT_CALLBACK_HANDLER_CLASS`]="software.amazon.msk.auth.iam.IAMClientCallbackHandler",t.IAMProfile)){const m=`software.amazon.msk.auth.iam.IAMLoginModule required awsProfileName="${t.IAMProfile}"`;e[`${f}_JAAS_CONFIG`]=m}e[`${r}_SCHEMAREGISTRY`]=t.schemaRegistryURL,e[`${r}_SCHEMAREGISTRYAUTH_USERNAME`]=t.schemaRegistryUsername,e[`${r}_SCHEMAREGISTRYAUTH_PASSWORD`]=t.schemaRegistryPassword,t.kafkaConnects.forEach((m,k)=>{const L=`${r}_KAFKACONNECT_${k}`;e[`${L}_NAME`]=m.name,e[`${L}_ADDRESS`]=m.url,e[`${L}_USERNAME`]=m.username,e[`${L}_PASSWORD`]=m.password}),e[`${r}_JMXPORT`]=t.jmxPort,t.jmxSslEnabled&&(e[`${r}_JMXSSL`]="true",s.push(`./jmx/clienttruststore:${t.jmxSsl.truststoreLocation}`),o.push(`-Djavax.net.ssl.trustStore=${t.jmxSsl.truststoreLocation}`),o.push(`-Djavax.net.ssl.trustStorePassword=${t.jmxSsl.truststorePassword}`),s.push(`./jmx/clientkeystore:${t.jmxSsl.keystoreLocation}`),o.push(`-Djavax.net.ssl.keyStore=${t.jmxSsl.keystoreLocation}`),o.push(`-Djavax.net.ssl.keyStorePassword=${t.jmxSsl.keystorePassword}`)),e[`${r}_JMXUSERNAME`]=t.jmxUsername,e[`${r}_JMXPASSWORD`]=t.jmxPassword}),{env:e,javaOpts:o,volumes:s}}),ee=I(B,({env:i,javaOpts:e,volumes:o})=>{let s=`docker run -p 8080:8080 \\
`;return s+=`		-d provectuslabs/kafka-ui:latest \\
`,Object.entries(i).forEach(([t,a])=>{a!==void 0&&(s+=`		-e ${t}=${a} \\
`)}),e.length>0&&(s+=`		-e JAVA_OPTS="\\
`,e.forEach(t=>s+=`			${t} \\
`),s+=`		"\\
`),o.length>0&&o.forEach(t=>s+=`		-v ${t} \\
`),s}),te=I(B,({env:i,javaOpts:e,volumes:o})=>{let s=`---
version: '2'
services:
  kafka-ui:
    container_name: kafka-ui
    image: provectuslabs/kafka-ui:latest
    ports:
      - 8080:8080
    depends_on:
      - kafka-connect0
    environment:
`;return Object.entries(i).forEach(([t,a])=>{a!==void 0&&(s+=`      ${t}:${a}
`)}),e.length>0&&(s+=`      JAVA_OPTS:>-
`,e.forEach(t=>s+=`        ${t}
`)),o.length>0&&(s+=`    volumes:
`,o.forEach(t=>s+=`      - ${t}
`)),s});function se(i){let e,o,s,t;return e=new j({props:{code:i[1]}}),s=new j({props:{code:i[2]}}),{c(){g(e.$$.fragment),o=H(),g(s.$$.fragment)},l(a){b(e.$$.fragment,a),o=J(a),b(s.$$.fragment,a)},m(a,r){v(e,a,r),x(a,o,r),v(s,a,r),t=!0},p(a,r){const _={};r&2&&(_.code=a[1]),e.$set(_);const n={};r&4&&(n.code=a[2]),s.$set(n)},i(a){t||(h(e.$$.fragment,a),h(s.$$.fragment,a),t=!0)},o(a){E(e.$$.fragment,a),E(s.$$.fragment,a),t=!1},d(a){M(e,a),a&&S(o),M(s,a)}}}function oe(i){let e,o;return e=new Z({}),{c(){g(e.$$.fragment)},l(s){b(e.$$.fragment,s)},m(s,t){v(e,s,t),o=!0},p:T,i(s){o||(h(e.$$.fragment,s),o=!0)},o(s){E(e.$$.fragment,s),o=!1},d(s){M(e,s)}}}function re(i){let e,o,s,t;const a=[oe,se],r=[];function _(n,u){return n[0].length===0?0:1}return e=_(i),o=r[e]=a[e](i),{c(){o.c(),s=y()},l(n){o.l(n),s=y()},m(n,u){r[e].m(n,u),x(n,s,u),t=!0},p(n,[u]){let c=e;e=_(n),e===c?r[e].p(n,u):(F(),E(r[c],1,1,()=>{r[c]=null}),q(),o=r[e],o?o.p(n,u):(o=r[e]=a[e](n),o.c()),h(o,1),o.m(s.parentNode,s))},i(n){t||(h(o),t=!0)},o(n){E(o),t=!1},d(n){r[e].d(n),n&&S(s)}}}function ae(i,e,o){let s,t,a;return P(i,Y,r=>o(0,s=r)),P(i,ee,r=>o(1,t=r)),P(i,te,r=>o(2,a=r)),[s,t,a]}class ue extends D{constructor(e){super(),U(this,e,ae,re,K,{})}}export{ue as default};
