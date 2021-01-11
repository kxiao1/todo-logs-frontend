(this["webpackJsonptodo-logs-frontend"]=this["webpackJsonptodo-logs-frontend"]||[]).push([[0],{210:function(e,t,n){},213:function(e,t,n){},403:function(e,t,n){"use strict";n.r(t);var c=n(16),r=n(0),i=n.n(r),a=n(24),o=n.n(a),l=(n(210),n(125)),d=n(148),s=n(86),u=n(192),j=n.n(u),h=n(408),b=n(410),f=n(46),O=n(411),p=n(409),m=n(412),x=n(413),k=(n(211),0),g=1,y="http://localhost:8000/api/todos/",C={username:"pareil1337",password:"internship"},S=(n(212),n(213),864e5),v=function(e){var t=new Date(e),n=""+(t.getMonth()+1),c=""+t.getDate(),r=t.getFullYear();return n.length<2&&(n="0"+n),c.length<2&&(c="0"+c),[r,n,c].join("-")};window.onbeforeunload=function(){localStorage.removeItem("token")};var T=function(){var e=Object(r.useState)(!1),t=Object(s.a)(e,2),n=t[0],i=t[1];n||fetch("http://localhost:8000/token-auth/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(C)}).then((function(e){if(!e.ok)throw new Error("Check credentials (i.e. constants.js).");return e.json()})).then((function(e){localStorage.setItem("token",e.access),i(!0)})).catch((function(e){return console.log(e.name,"\n",e.message)}));var a=Object(r.useState)(new Date),o=Object(s.a)(a,2),u=o[0],T=o[1],w=Object(r.useRef)(k),D=v(u.getTime()),F=w.current===g?"*"+v(u-(u.getDay()+6)%7*S)+" to "+v(u-(u.getDay()-7)%7*S):"",N=F.length>0?Object(c.jsx)("span",{id:"dateRange",children:F}):null,E=Object(r.useState)(null),I=Object(s.a)(E,2),R=I[0],P=I[1],z=function(e,t){var n="",c=(t.key,t.id),r=(t.isFirst,Object(d.a)(t,["key","id","isFirst"]));"POST"!==e&&(n=c+"/"),fetch(y+n,{method:e,headers:{"Content-Type":"application/JSON",Authorization:"Bearer "+localStorage.getItem("token")},body:r?JSON.stringify(r):null}).then(J).catch((function(e){return console.log(e)}))},J=function(){var e=y+"?"+new URLSearchParams({date:D,mode:w.current});fetch(e,{headers:{"Content-Type":"application/JSON",Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){if(!e.ok)throw new Error("Check credentials and try refreshing.");return e.json()})).then((function(e){return ee(e)})).catch(alert)},A={title:"",description:"",date_added:D,completed:!1,id:-1},_=Object(r.useState)(!1),B=Object(s.a)(_,2),L=B[0],q=B[1],U=Object(r.useState)(A),V=Object(s.a)(U,2),M=V[0],W=V[1],Y=Object(r.useRef)(null),G=Object(r.useRef)(null),H=Object(r.useRef)(null),K=Object(r.useRef)(null),Q=Object(r.useRef)(null),X=Object(r.useRef)(0),Z=function(){var e={title:G.current.value,description:H.current.value,date_added:K.current.value,completed:Q.current.checked};-1===X.current?z("POST",e):(e.id=X.current,z("PUT",e)),Y.current.reset(),q(!1)},$=function(e){X.current=e.id||-1,q(!0),W(e)},ee=function(e){var t=e.map((function(e){var t=e.id,n=Object(d.a)(e,["id"]);return Object(l.a)({key:t,id:t},n)}));t.sort((function(e,t){return e.title<t.title?-1:e.title>t.title?1:0}));var n=t.map((function(e,n){return Object(l.a)(Object(l.a)({},e),{},{isFirst:0===n||e.title!==t[n-1].title})}));P(Object(c.jsx)(h.a,{dataSource:n,columns:te,pagination:{pageSize:7}}))},te=[{title:"Title",dataIndex:"title",key:"title",render:function(e,t){return t.isFirst&&e}},{title:"Description",dataIndex:"description",key:"description"},{title:"Date Added",dataIndex:"date_added",key:"date_added"},{title:"Status",dataIndex:"completed",key:"completed",render:function(e){return e?Object(c.jsx)(m.a,{twoToneColor:"#52c41a",style:{fontSize:"16px"}}):Object(c.jsx)(x.a,{twoToneColor:"#eb2f96",style:{fontSize:"16px"}})}},{title:"Actions",key:"action",render:function(e,t){return Object(c.jsxs)(b.b,{size:"middle",children:[Object(c.jsx)(f.a,{onClick:function(){return $(t)},children:"Edit"}),Object(c.jsx)(f.a,{disabled:t.completed,onClick:function(){return function(e){e.completed=!0,z("PUT",e)}(t)},children:"Complete"}),Object(c.jsx)(f.a,{danger:!0,onClick:function(){return function(e){z("DELETE",e)}(t)},children:"Delete"})]})}}],ne=Object(c.jsx)("div",{id:"placeholder",children:n?"":"Not connected to server."});return n&&null==R&&J(),console.log(w.current),Object(c.jsxs)("div",{className:"App",children:[Object(c.jsxs)("div",{className:"wrap",children:[Object(c.jsx)("h1",{id:"title",children:"todo-logs"}),R&&Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("div",{className:"switch",children:[Object(c.jsx)(O.a,{onClick:function(){w.current=w.current===k?g:k,J()},checkedChildren:"Weekly",unCheckedChildren:"Daily",defaultChecked:w.current===g}),N]}),Object(c.jsxs)("div",{className:"close",children:[Object(c.jsxs)("div",{className:"date",children:[Object(c.jsx)(j.a,{id:"datepicker",selected:u,onChange:function(e){T(e),P(null)}}),Object(c.jsx)(f.a,{onClick:function(){T(new Date),P(null)},children:w.current===k?"Today":"This Week"})]}),Object(c.jsx)(f.a,{type:"primary",onClick:function(){return $(A)},children:"New Task"})]}),R,Object(c.jsx)(p.a,{visible:L,onOk:Z,onCancel:function(){Y.current.reset(),q(!1)},children:Object(c.jsxs)("form",{ref:Y,onSubmit:Z,children:[Object(c.jsx)("h2",{id:"modalTitle",children:-1===X.current?"New Task":"Edit Task"}),Object(c.jsx)("label",{htmlFor:"title",className:"required",children:"Title"}),Object(c.jsx)("input",{type:"text",name:"title",defaultValue:M.title,ref:G,placeholder:"Enter Title",required:!0}),Object(c.jsx)("br",{}),Object(c.jsx)("label",{htmlFor:"description",className:"required",children:"Description"}),Object(c.jsx)("input",{type:"text",name:"description",defaultValue:M.description,ref:H,placeholder:"Enter Description"}),Object(c.jsx)("br",{}),Object(c.jsx)("label",{htmlFor:"date",children:"Date added"}),Object(c.jsx)("input",{type:"date",name:"date",defaultValue:M.date_added,ref:K,readOnly:!0,id:"readonly"}),Object(c.jsx)("br",{}),Object(c.jsx)("input",{type:"checkbox",name:"completed",ref:Q,defaultChecked:M.completed}),Object(c.jsx)("label",{htmlFor:"completed",children:"Completed?"})]})})]})]}),!R&&ne]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,414)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))};o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(T,{})}),document.getElementById("root")),w()}},[[403,1,2]]]);
//# sourceMappingURL=main.44905581.chunk.js.map