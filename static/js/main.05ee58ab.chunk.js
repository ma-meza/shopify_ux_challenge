(this.webpackJsonpshopify_ux_challenge=this.webpackJsonpshopify_ux_challenge||[]).push([[0],{26:function(t,e,n){},27:function(t,e,n){},46:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n(3),s=n.n(a),o=n(15),r=n.n(o),c=(n(26),n(16)),l=n(17),h=n(18),u=n(2),d=n(20),m=n(19),b=(n(27),n(4)),g=n.n(b),p=n(5),j=n.n(p),f=function(t){Object(d.a)(n,t);var e=Object(m.a)(n);function n(t){var i;return Object(l.a)(this,n),(i=e.call(this,t)).state={titleSearchInput:"",searchResults:[],nominationsList:[],searchResultErrorMessage:""},i.handleInputChange=i.handleInputChange.bind(Object(u.a)(i)),i.nominateMovie=i.nominateMovie.bind(Object(u.a)(i)),i.unNominateMovie=i.unNominateMovie.bind(Object(u.a)(i)),i.isNominated=i.isNominated.bind(Object(u.a)(i)),i.updateLocalStorage=i.updateLocalStorage.bind(Object(u.a)(i)),i.clearLocalStorage=i.clearLocalStorage.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var t=this,e=new URLSearchParams(window.location.search).get("nomi");if(e&&e.length>0){for(var n=e.split("$$"),i=[],a=[],s=0;s<n.length;s++)a.push(g.a.get("https://www.omdbapi.com/?apikey=82ab90b1&i="+n[s]));g.a.all(a).then(g.a.spread((function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];for(var s=0;s<n.length;s++)"True"===n[s].data.Response&&i.push(n[s].data);i.length>0&&t.setState({nominationsList:i})})))}else"undefined"!==typeof Storage&&localStorage.movieNominations&&this.setState({nominationsList:JSON.parse(localStorage.movieNominations)})}},{key:"handleInputChange",value:function(t){var e=this,n=t.target,i=n.name,a=n.value;"titleSearchInput"===i&&g.a.get("https://www.omdbapi.com/?apikey=82ab90b1&s="+a+"&type=movie").then((function(t){"True"===t.data.Response?(console.log(t.data.Search),e.setState({searchResults:t.data.Search})):e.setState({searchResultErrorMessage:t.data.Error})})).catch((function(t){t&&(alert("title_search_error"),console.log(t))})),this.setState(Object(c.a)({},i,a))}},{key:"updateLocalStorage",value:function(){"undefined"!==typeof Storage&&localStorage.setItem("movieNominations",JSON.stringify(this.state.nominationsList))}},{key:"clearLocalStorage",value:function(){"undefined"!==typeof Storage&&localStorage.removeItem("movieNominations")}},{key:"nominateMovie",value:function(t){for(var e=this,n=t.imdbID,i=this.state.nominationsList,a=0;a<i.length;a++)if(i[a].imdbID===n)return;this.state.nominationsList.length<=4&&(i.push(t),this.setState({nominationsList:i},(function(){e.updateLocalStorage()})))}},{key:"unNominateMovie",value:function(t){for(var e=this,n=t.imdbID,i=this.state.nominationsList,a=0;a<i.length;a++)if(i[a].imdbID===n)return i.splice(a,1),void this.setState({nominationsList:i},(function(){e.updateLocalStorage()}))}},{key:"isNominated",value:function(t){for(var e=0;e<this.state.nominationsList.length;e++)if(this.state.nominationsList[e].imdbID===t)return!0;return!1}},{key:"render",value:function(){var t,e,n,a=this;return t=this.state.searchResults.length>0?this.state.searchResults.map((function(t,e){return Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{children:[t.Title," (",t.Year,")"]}),a.isNominated(t.imdbID)?Object(i.jsx)("button",{className:j.a.disabledButton,children:"Nominate"}):Object(i.jsx)("button",{className:j.a.button,onClick:function(){a.nominateMovie(t)},children:"Nominate"})]},e)})):this.state.searchResultErrorMessage.length>0?Object(i.jsx)("p",{children:this.state.searchResultErrorMessage}):Object(i.jsx)("p",{children:"Enter a movie title to get some results."}),this.state.nominationsList.length>0?(n="httpss://marque2.github.io/shopify_ux_challenge?nomi=",e=this.state.nominationsList.map((function(t,e){return n+=t.imdbID+"$$",Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{children:["Nomination: ",t.Title]}),Object(i.jsx)("button",{className:j.a.button,onClick:function(){a.unNominateMovie(t)},children:"Remove"})]},e)})),n=n.substring(0,n.length-2)):e=Object(i.jsx)("p",{children:"Add nominations!!"}),Object(i.jsxs)("div",{className:"App",children:[5===this.state.nominationsList.length?Object(i.jsx)("div",{children:Object(i.jsx)("p",{children:"Your nomination list is full!"})}):null,Object(i.jsx)("div",{children:Object(i.jsx)("input",{onChange:this.handleInputChange,type:"text",name:"titleSearchInput",value:this.state.titleSearchInput,placeholder:"movie title"})}),Object(i.jsx)("div",{children:t}),Object(i.jsx)("div",{children:e}),n]})}}]),n}(s.a.Component),v=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,47)).then((function(e){var n=e.getCLS,i=e.getFID,a=e.getFCP,s=e.getLCP,o=e.getTTFB;n(t),i(t),a(t),s(t),o(t)}))};r.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(f,{})}),document.getElementById("root")),v()},5:function(t,e,n){t.exports={disabledButton:"styles_disabledButton__GUcf1",button:"styles_button__3gdzL"}}},[[46,1,2]]]);
//# sourceMappingURL=main.05ee58ab.chunk.js.map