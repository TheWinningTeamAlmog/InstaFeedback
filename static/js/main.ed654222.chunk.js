(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{174:function(e,t,a){e.exports=a(314)},179:function(e,t,a){},182:function(e,t,a){},314:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(34),l=a.n(s),o=(a(179),a(51)),i=a.n(o),c=a(92),m=a(140),u=a(141),d=a(162),p=a(142),h=a(163),g=a(52),E=a.n(g),w=(a(182),a(323)),f=a(327),b=a(324),y=a(46),v=a(72),x=a(322),k=a(325),I=(a(183),a(143)),A=a.n(I),j=["Ade","Christian","Daniel","Elliot","Helen","Jenny","Joe","Justen","Laura","Matt","Nan","Steve","Stevie","Tom","Veronika","Zoe"],C=r.a.createElement("h1",{style:{marginTop:"10px",cursor:"pointer"},onClick:function(){window.location=window.location}},"Insta",r.a.createElement("img",{alt:"",src:E.a,style:{width:"0.75em"}}),"Feedback"),S=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).usernameChanged=Object(c.a)(i.a.mark(function e(){var t,n,r,s,l,o,c;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState({isLoading:!0}),t=document.getElementById("input-username").value,e.next=4,fetch("https://www.instagram.com/".concat(t,"/"));case 4:if((n=e.sent).ok&&""!==t.trim()){e.next=8;break}return a.setState({isLoading:!1,mainImage:E.a,usernameError:!0}),e.abrupt("return");case 8:return e.next=10,n.text();case 10:if(r=e.sent,s=r.match(/"https:\/\/.+?\.jpg\?.+?"/g),l=document.getElementById("input-username").value,t===l){e.next=15;break}return e.abrupt("return");case 15:a.setState({username:t}),Array.isArray(s)&&s.length>0&&(o=s[0],c=o.slice(1,o.length-1),a.setState({mainImage:c,usernameError:!1}));case 17:case"end":return e.stop()}},e)})),a.readFile=function(){var e=document.getElementById("file-upload").files[0];if(e){var t=new FileReader;t.addEventListener("load",function(){a.setState({uploadedImageB64:t.result})},!1),t.readAsDataURL(e)}},a.submit=Object(c.a)(i.a.mark(function e(){var t,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState({loadingAPI:!0}),e.next=3,fetch("https://eu-gb.functions.cloud.ibm.com/api/v1/web/shmueljacobs%40gmail.com_dev/default/GuessData.json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fileBase64:a.state.uploadedImageB64.split(",").slice(1).join(","),user:a.state.username})});case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,a.setState({comments:n.comments,likes:n.likes});case 8:case"end":return e.stop()}},e)})),a.state={isLoading:!1,mainImage:E.a},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e,t,a=this;Array.isArray(this.state.comments)&&Number.isInteger(this.state.likes)?(j=j.sort(function(){return.5-Math.random()}),e=r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},C,r.a.createElement("img",{src:this.state.uploadedImageB64,alt:"logo",style:{marginTop:"10px",maxHeight:"600px",maxWidth:"".concat(window.innerWidth-10,"px")}}),r.a.createElement("h1",null,"Social Projections:"),r.a.createElement("span",{style:{marginBottom:"10px"}},r.a.createElement("a",{href:"https://www.instagram.com/explore/tags/banana/",target:"_blank"},"#banana")," ",r.a.createElement("a",{href:"https://www.instagram.com/explore/tags/papaya/",target:"_blank"},"#papaya")," ",r.a.createElement("a",{href:"https://www.instagram.com/explore/tags/myple_story/",target:"_blank"},"#myple_story")," "),r.a.createElement(w.a.Group,{style:{textAlign:"initial"}},r.a.createElement(f.a,{as:"h3"},r.a.createElement(b.a,{compact:!0},r.a.createElement(b.a.Item,null,r.a.createElement(y.a,{name:"comments"})," Comments",r.a.createElement(v.a,{color:"teal",floating:!0},"3")),r.a.createElement(b.a.Item,null,r.a.createElement(y.a,{name:"heart"})," Likes",r.a.createElement(v.a,{color:"red",floating:!0},A()(this.state.likes,1))))),r.a.createElement(w.a,null,r.a.createElement(w.a.Avatar,{src:"https://react.semantic-ui.com/images/avatar/small/".concat(j[0].toLowerCase(),".jpg")}),r.a.createElement(w.a.Content,null,r.a.createElement(w.a.Author,{as:"a"},j[0]),r.a.createElement(w.a.Metadata,{style:{color:"lightgrey"}},r.a.createElement("div",null,"Today at 5:42PM")),r.a.createElement(w.a.Text,null,this.state.comments[0]))),r.a.createElement(w.a,null,r.a.createElement(w.a.Avatar,{src:"https://react.semantic-ui.com/images/avatar/small/".concat(j[1].toLowerCase(),".jpg")}),r.a.createElement(w.a.Content,null,r.a.createElement(w.a.Author,{as:"a"},j[1]),r.a.createElement(w.a.Metadata,{style:{color:"lightgrey"}},r.a.createElement("div",null,"Yesterday at 12:30AM")),r.a.createElement(w.a.Text,null,this.state.comments[1]))),r.a.createElement(w.a,null,r.a.createElement(w.a.Avatar,{src:"https://react.semantic-ui.com/images/avatar/small/".concat(j[2].toLowerCase(),".jpg")}),r.a.createElement(w.a.Content,null,r.a.createElement(w.a.Author,{as:"a"},j[2]),r.a.createElement(w.a.Metadata,{style:{color:"lightgrey"}},r.a.createElement("div",null,"5 days ago")),r.a.createElement(w.a.Text,null,this.state.comments[2]))))))):(t=this.state.mainImage===E.a?r.a.createElement("img",{src:this.state.mainImage,alt:"logo",style:{marginTop:"10px",width:"155px",height:"155px"}}):r.a.createElement("a",{href:"https://www.instagram.com/".concat(this.state.username,"/"),target:"_blank",rel:"noopener noreferrer"},r.a.createElement("img",{src:this.state.mainImage,alt:"logo",style:{marginTop:"10px",width:"155px",height:"155px",borderRadius:"50%"},onLoad:function(){return a.setState({isLoading:!1})}})),e=r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},t,C,r.a.createElement(x.a,{autoComplete:"off"},r.a.createElement(x.a.Input,{error:this.state.usernameError,style:{width:"300px"},id:"input-username",loading:this.state.isLoading,placeholder:"Username",onChange:this.usernameChanged}),r.a.createElement(v.a,{as:"label",basic:!0,htmlFor:"file-upload"},r.a.createElement(k.a,{icon:"upload",label:{basic:!0,content:"Photo"},labelPosition:"right"}),r.a.createElement("input",{hidden:!0,id:"file-upload",accept:"image/*",type:"file",onChange:this.readFile})),r.a.createElement("br",null),r.a.createElement(k.a,{loading:this.state.loadingAPI,onClick:this.submit,style:{marginTop:"10px"},disabled:!this.state.uploadedImageB64||!this.state.username||this.state.usernameError,color:this.state.uploadedImageB64&&this.state.username&&!this.state.usernameError?"green":void 0},"Submit")))));return e}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},52:function(e,t,a){e.exports=a.p+"static/media/instagram-logo-black.7ea7582b.png"}},[[174,1,2]]]);
//# sourceMappingURL=main.ed654222.chunk.js.map