(window.webpackJsonpapp=window.webpackJsonpapp||[]).push([[0],[,,,,,,,,,,,function(e,t,n){e.exports=n.p+"static/media/Happy.d51ce461.svg"},function(e,t,n){e.exports=n.p+"static/media/Sad.28aa5087.svg"},function(e,t,n){e.exports=n.p+"static/media/Cool.13d79071.svg"},function(e,t,n){e.exports=n.p+"static/media/DOMO.554d941c.svg"},function(e,t,n){e.exports=n.p+"static/media/Logo.75f61d59.svg"},,function(e,t,n){e.exports=n(32)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(10),r=n.n(o),i=(n(22),n(1)),l=(n(23),n(24),function(e){var t=e.children,n=e.normal;return c.a.createElement("div",{className:"card ".concat(n&&"normal")},t)}),s=(n(25),function(e){var t=e.children,n=e.href,a=e.newtab,o=e.button,r=e.onClick;return o&&r?c.a.createElement("button",{className:"button-domo",onClick:r},t):c.a.createElement("a",{href:n,target:a?"_blank":"_self",className:"button-domo"},t)}),u=n(11),m=n.n(u),f=n(12),d=n.n(f),p=n(13),b=n.n(p),g=(n(26),function(e){var t=e.state,n=e.onClick;return c.a.createElement("button",{className:"buttonStyle",onClick:n},c.a.createElement("img",{src:function(e){return 1===e?m.a:2===e?d.a:3===e?b.a:null}(t),alt:"emotion",className:"EmojiStyle"}))}),v=(n(27),{margin:"10px"}),E=function(e){var t=e.name,n=e.artist;return c.a.createElement("div",{style:v},c.a.createElement("h2",null,t," "),c.a.createElement("h3",null,n))},O=n(14),j=n.n(O),y=n(15),h=n.n(y),k=(n(28),function(e){var t=e.artist,n=e.name,o=e.src,r=e.preview_url,l=e.valence,s=e.onClick,u=Object(a.useState)(!1),m=Object(i.a)(u,2),f=m[0],d=m[1];return r?c.a.createElement("div",{className:"list-container"},c.a.createElement("div",null,c.a.createElement("img",{alt:n,src:o,style:{height:"50px"}})),c.a.createElement("div",{className:"list-who"},c.a.createElement("span",{className:"list-name"},n),c.a.createElement("span",{className:"list-artist"},t)),c.a.createElement("div",{className:"list-valence"},c.a.createElement("span",{className:"valence"},l)),c.a.createElement("div",{className:"list-audio ".concat(f?"active-audio":"disabled-audio")},c.a.createElement("audio",{controls:!0,src:r,preload:"none"},"Your browser does not support the",c.a.createElement("code",null,"audio")," element.")),!f&&c.a.createElement("button",{disabled:f,className:"add-music",onClick:function(){d(!0),s()}},"ADD")):""}),_=n(16),S=n(2),w=n.n(S),x=(new w.a,function(){var e,t={},n=/([^&;=]+)=?([^&;]*)/g,a=window.location.hash.substring(1);for(e=n.exec(a);e;)t[e[1]]=decodeURIComponent(e[2]),e=n.exec(a);return t}),C="https://sentimusic.herokuapp.com",N=C+"/login",P=n(4),I=n.n(P),A=(n(29),{apiKey:"AIzaSyALTJda55N9Xs_i-dQ5V5BWyR37cU3CMDA",authDomain:"domo-music.firebaseapp.com",databaseURL:"https://domo-music.firebaseio.com",projectId:"domo-music",storageBucket:"domo-music.appspot.com",messagingSenderId:"550634181029",appId:"1:550634181029:web:5f28c1b8216991d346184c"});I.a.initializeApp(A);var D=I.a,M=D.firestore();function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var R=new w.a;var B=function(){var e=Object(a.useState)({}),t=Object(i.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)(function(){R.getMe().then(function(e){c(e)})},[]),[n]},L=function(){var e=Object(a.useState)({name:"",artist:"",albumArt:"",is_playing:!1,uri:"",id:""}),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(!1),r=Object(i.a)(o,2),l=r[0],s=r[1],u=Object(a.useState)(!1),m=Object(i.a)(u,2),f=m[0],d=m[1];return Object(a.useEffect)(function(){t();var e=setInterval(function(){return t()},3e3);function t(){R.getMyCurrentPlaybackState(function(t,n){t?(d(!0),clearInterval(e),localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),console.error(t)):(d(!1),s(!!n&&n.is_playing),n.item&&"episode"!==n.currently_playing_type&&c({name:n.item.name,albumArt:n.item.album.images[0].url,is_playing:n.is_playing,uri:n.item.uri,id:n.item.id,artist:n.item.artists[0].name}))})}return function(){clearInterval(e)}},[]),[n,f,l]},z=function(e,t){var n=Object(a.useState)([]),c=Object(i.a)(n,2),o=c[0],r=c[1],l=F(),s=Object(i.a)(l,1)[0],u=Object(a.useState)("".concat(s.join(",")).concat(e.id?","+e.id:"")),m=Object(i.a)(u,2),f=m[0],d=m[1];return Object(a.useEffect)(function(){d("".concat(s.join(",")).concat(e.id?","+e.id:""))},[e,s]),Object(a.useEffect)(function(){f&&R.getRecommendations(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(n,!0).forEach(function(t){Object(_.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({limit:15,market:"PE",seed_tracks:f},function(e){return 0===e?{min_valence:0,max_valence:1}:1===e?{min_valence:.5,max_valence:1}:2===e?{min_valence:0,max_valence:.5}:3===e?{min_valence:0,max_valence:1}:void 0}(t))).then(function(e){r(e.tracks)})},[t,f]),[o]},F=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)(function(){R.getMySavedTracks({limit:4,offset:0,market:"PE"}).then(function(e){var t=e.items.map(function(e){return e.track.id});c(t)})},[]),[n]},J=function(){var e=B(),t=Object(i.a)(e,1)[0],n=Object(a.useState)(null),c=Object(i.a)(n,2),o=c[0],r=c[1],l=Object(a.useState)({}),s=Object(i.a)(l,2),u=s[0],m=s[1];return Object(a.useEffect)(function(){o&&localStorage.setItem("playlist_id",o)},[o]),Object(a.useEffect)(function(){t.id&&function(e,t){if(e){var n=M.collection("users").doc(e);n.get().then(function(a){a.exists?t(a.data()):(n.set({user:e}),console.log("No such document!"),t(null,"No such document!"))})}else t(null,"No such user!")}(t.id,function(e,n){if(n)return console.log(n);e&&(e.playlist_id?r(e.playlist_id):R.createPlaylist(t.id,{name:"Domo Playlist",public:!1,collaborative:!0,description:"Playlist de musica Recomendada"}).then(function(e){!function(e,t,n){e?M.collection("users").doc(e).set(t,{merge:!0}).then(function(){n(t)}).catch(function(e){n(null,e)}):n(null,"No such user!")}(t.id,{playlist_id:e.id},function(e,t){return console.log(e,t)}),r(e.id)}))})},[t.id]),Object(a.useEffect)(function(){o&&R.getPlaylist(o).then(function(e){console.log(e),m(e),r(e.id)})},[o]),[u]};var U={margin:"20px"},W=function(e){var t=e.nowPlaying,n=e.state,a=J(),o=Object(i.a)(a,1)[0],r=z(t,n),u=Object(i.a)(r,1)[0],m=c.a.createElement("h2",null,function(e){return 0===e?"Playlist automatica":1===e?"Playlist Feliz":2===e?"Modo Sad":3===e?"Modo Cool":"Me buggie"}(n));return c.a.createElement(l,{normal:!0},c.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"auto 40%",alignItems:"center"}},m,o.external_urls&&c.a.createElement(s,{href:o.external_urls.spotify,style:U},"Ir a la playlist creada")),u.map(function(e,t){return c.a.createElement(k,{key:e.id,artist:e.artists[0].name,name:e.name,src:e.album.images?e.album.images[0].url:"",preview_url:e.preview_url,valence:e.valence,onClick:function(){return function(e,t){console.log(e,t),R.addTracksToPlaylist(e,[t]).then(function(e){console.log(e),R.play(),alert("Se a\xf1adio con exito")})}(o.id,e.uri)}})}))},V={margin:"20px"};var q=function(){var e=function(){var e=x(),t=Object(a.useState)(!1),n=Object(i.a)(t,2),c=n[0],o=n[1],r=Object(a.useState)(localStorage.getItem("access_token")||e.access_token||""),l=Object(i.a)(r,1)[0],s=Object(a.useState)(localStorage.getItem("refresh_token")||e.refresh_token||""),u=Object(i.a)(s,1)[0];return Object(a.useEffect)(function(){},[]),Object(a.useEffect)(function(){l&&(R.setAccessToken(l),localStorage.setItem("access_token",l),localStorage.setItem("refresh_token",u)),o(!!l)},[l,u]),c}(),t=Object(a.useState)(0),n=Object(i.a)(t,2),o=n[0],r=n[1],u=Object(a.useState)(null),m=Object(i.a)(u,2),f=m[0],d=m[1],p=L(),b=Object(i.a)(p,2),v=b[0],O=b[1];return Object(a.useEffect)(function(){console.log("now",f),console.log("state",o)},[f,o]),!e||O?c.a.createElement("div",{className:"App-header"},c.a.createElement(l,null,c.a.createElement("p",null,c.a.createElement("img",{src:j.a,alt:"texto",style:V})),c.a.createElement("p",null,c.a.createElement("img",{src:h.a,alt:"Logo Domo",style:V})),c.a.createElement(s,{href:N,style:V},"Iniciar sesion con spotify"))):c.a.createElement("div",{className:"App-header"},v.name&&c.a.createElement(l,{normal:!0},c.a.createElement("h3",{style:{textAlign:"left"}},"Ahora reproduciendo:"),c.a.createElement(E,{name:v.name,artist:"".concat(v.artist," ")})),c.a.createElement(l,null,0!==o&&c.a.createElement(s,{button:!0,onClick:function(){d(null),r(0)}},"Volver a escoger"),f?0===o&&c.a.createElement(c.a.Fragment,null,c.a.createElement("h2",null,"\xbfComo te quieres sentir ?"),c.a.createElement(g,{onClick:function(){return r(1)},state:1}),c.a.createElement(g,{onClick:function(){return r(3)},state:3}),c.a.createElement(g,{onClick:function(){return r(2)},state:2})):c.a.createElement(c.a.Fragment,null,c.a.createElement("h2",null,"\xbfComo te sientes ahora?"),c.a.createElement(g,{onClick:function(){return d(1)},state:1}),c.a.createElement(g,{onClick:function(){return d(3)},state:3}),c.a.createElement(g,{onClick:function(){return d(2)},state:2}))),f&&0!==o&&c.a.createElement(W,{nowPlaying:v,state:o}))};Boolean("34.68.6.184"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[17,1,2]]]);
//# sourceMappingURL=main.d1fda2ce.chunk.js.map