(window.webpackJsonpapp=window.webpackJsonpapp||[]).push([[0],[,,,,,function(e,t,a){e.exports=a.p+"static/media/Happy.d51ce461.svg"},function(e,t,a){e.exports=a.p+"static/media/Sad.28aa5087.svg"},function(e,t,a){e.exports=a.p+"static/media/DOMO.554d941c.svg"},function(e,t,a){e.exports=a.p+"static/media/Logo.75f61d59.svg"},function(e,t,a){e.exports=a(21)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(4),i=a.n(r),l=(a(14),a(1)),o=(a(15),a(16),function(e){var t=e.children,a=e.normal;return c.a.createElement("div",{className:"card ".concat(a&&"normal")},t)}),s=(a(17),function(e){var t=e.children,a=e.href,n=e.newtab;return c.a.createElement("a",{href:a,target:n?"_blank":"_self",className:"button-domo"},t)}),u=a(5),m=a.n(u),f=a(6),d=a.n(f),p=(a(18),function(e){var t=e.state,a=e.onClick;return c.a.createElement("button",{className:"buttonStyle",onClick:a},c.a.createElement("img",{src:t?m.a:d.a,alt:t?"Happy":"Sad",className:"EmojiStyle"}))}),b=(a(19),{margin:"10px"}),g=function(e){var t=e.name,a=e.artist;return c.a.createElement("div",{style:b},c.a.createElement("h2",null,t," "),c.a.createElement("h3",null,a))},v=a(7),E=a.n(v),j=a(8),O=a.n(j),y=(a(20),function(e){var t=e.artist,a=e.name,r=e.src,i=e.preview_url,o=e.valence,s=e.onClick,u=Object(n.useState)(!1),m=Object(l.a)(u,2),f=m[0],d=m[1];return i?c.a.createElement("div",{className:"list-container"},c.a.createElement("div",null,c.a.createElement("img",{alt:a,src:r,style:{height:"50px"}})),c.a.createElement("div",{className:"list-who"},c.a.createElement("span",{className:"list-name"},a),c.a.createElement("span",{className:"list-artist"},t)),c.a.createElement("div",{className:"list-valence"},c.a.createElement("span",{className:"valence"},o)),c.a.createElement("div",{className:"list-audio ".concat(f?"active-audio":"disabled-audio")},c.a.createElement("audio",{controls:!0,src:i,preload:"none"},"Your browser does not support the",c.a.createElement("code",null,"audio")," element.")),!f&&c.a.createElement("button",{disabled:f,className:"add-music",onClick:function(){d(!0),s()}},"ADD")):""}),h=a(2),S=a.n(h),k=(new S.a,function(){var e,t={},a=/([^&;=]+)=?([^&;]*)/g,n=window.location.hash.substring(1);for(e=a.exec(n);e;)t[e[1]]=decodeURIComponent(e[2]),e=a.exec(n);return t}),_="https://sentimusic.herokuapp.com",w=_+"/login",I=new S.a;var x=function(){var e=Object(n.useState)({}),t=Object(l.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)(function(){I.getMe().then(function(e){c(e)})},[]),[a]},N=function(){var e=Object(n.useState)({name:"",artist:"",albumArt:"",is_playing:!1,uri:"",id:""}),t=Object(l.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(!1),i=Object(l.a)(r,2),o=i[0],s=i[1],u=Object(n.useState)(!1),m=Object(l.a)(u,2),f=m[0],d=m[1];return Object(n.useEffect)(function(){t();var e=setInterval(function(){return t()},3e3);function t(){I.getMyCurrentPlaybackState(function(t,a){t?(d(!0),clearInterval(e),localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),console.error(t)):(d(!1),s(!!a&&a.is_playing),a.item&&"episode"!==a.currently_playing_type&&c({name:a.item.name,albumArt:a.item.album.images[0].url,is_playing:a.is_playing,uri:a.item.uri,id:a.item.id,artist:a.item.artists[0].name}))})}return function(){clearInterval(e)}},[]),[a,f,o]},P=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)(function(){I.getMySavedTracks({limit:4,offset:0,market:"PE"}).then(function(e){var t=e.items.map(function(e){return e.track.id});c(t)})},[]),[a]},C=function(){var e=x(),t=Object(l.a)(e,1)[0],a=function(){var e=x(),t=Object(l.a)(e,1)[0],a=Object(n.useState)([]),c=Object(l.a)(a,2),r=c[0],i=c[1],o=Object(n.useState)(0),s=Object(l.a)(o,2),u=s[0],m=s[1];return Object(n.useEffect)(function(){t&&I.getUserPlaylists(t.id,{limit:50}).then(function(e){i(e.items)})},[t]),Object(n.useEffect)(function(){if(r.length>0){var e=document.cookie.split(";").map(function(e){var t=e.split("=");return{name:t[0],data:t[1]}}).find(function(e){return" playlist_id"===e.name}),t=r.find(function(e){return"Domo Playlist"===e.name});m(t?1:2),t&&localStorage.setItem("playlist_id",t.id),e&&localStorage.setItem("playlist_id",e.data)}},[t.id,r]),[u]}(),c=Object(l.a)(a,1)[0],r=Object(n.useState)({}),i=Object(l.a)(r,2),o=i[0],s=i[1];return Object(n.useEffect)(function(){if(!t.id&&2!==c||1===c)return console.log("esperando usuario");localStorage.getItem("playlist_id")?I.getPlaylist(localStorage.getItem("playlist_id")).then(function(e){return s(e)}):I.createPlaylist(t.id,{name:"Domo Playlist",public:!1,collaborative:!0,description:"Playlist de musica Recomendada"}).then(function(e){localStorage.setItem("playlist_id",e.id),s(e)})},[t.id,c]),[o]};var A={margin:"20px"},D=function(e){var t=e.nowPlaying,a=e.state,r=C(),i=Object(l.a)(r,1)[0],u=function(e,t){var a=Object(n.useState)([]),c=Object(l.a)(a,2),r=c[0],i=c[1],o=P(),s=Object(l.a)(o,1)[0],u=Object(n.useState)("".concat(s.join(",")).concat(e.id?","+e.id:"")),m=Object(l.a)(u,2),f=m[0],d=m[1];return Object(n.useEffect)(function(){d("".concat(s.join(",")).concat(e.id?","+e.id:""))},[e,s]),Object(n.useEffect)(function(){console.log(f),f&&I.getRecommendations({limit:15,market:"PE",seed_tracks:f,min_valence:0===t?0:1===t?.5:0,max_valence:0===t?1:1===t?1:.5}).then(function(e){i(e.tracks)})},[t,f]),[r]}(t,a),m=Object(l.a)(u,1)[0],f=c.a.createElement("h2",null,0===a?"Playlist automatica":1===a?"Playlist Feliz":"Modo Sad");return c.a.createElement(o,{normal:!0},c.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"auto 40%",alignItems:"center"}},f,i.external_urls&&c.a.createElement(s,{href:i.external_urls.spotify,style:A},"Ir a la playlist creada")),m.map(function(e,t){return c.a.createElement(y,{key:e.id,artist:e.artists[0].name,name:e.name,src:e.album.images[0].url,preview_url:e.preview_url,valence:e.valence,onClick:function(){return function(e,t){console.log(e,t),I.addTracksToPlaylist(e,[t]).then(function(e){console.log(e),I.play(),alert("Se a\xf1adio con exito")})}(i.id,e.uri)}})}))},M={margin:"20px"};var T=function(){var e=function(){var e=k(),t=Object(n.useState)(!1),a=Object(l.a)(t,2),c=a[0],r=a[1],i=Object(n.useState)(localStorage.getItem("access_token")||e.access_token||""),o=Object(l.a)(i,1)[0],s=Object(n.useState)(localStorage.getItem("refresh_token")||e.refresh_token||""),u=Object(l.a)(s,1)[0];return Object(n.useEffect)(function(){},[]),Object(n.useEffect)(function(){o&&(I.setAccessToken(o),localStorage.setItem("access_token",o),localStorage.setItem("refresh_token",u)),r(!!o)},[o,u]),c}(),t=Object(n.useState)(0),a=Object(l.a)(t,2),r=a[0],i=a[1],u=N(),m=Object(l.a)(u,2),f=m[0],d=m[1];return!e||d?c.a.createElement("div",{className:"App-header"},c.a.createElement(o,null,c.a.createElement("p",null,c.a.createElement("img",{src:E.a,alt:"texto",style:M})),c.a.createElement("p",null,c.a.createElement("img",{src:O.a,alt:"Logo Domo",style:M})),c.a.createElement(s,{href:w,style:M},"Iniciar sesion con spotify"))):c.a.createElement("div",{className:"App-header"},f.name&&c.a.createElement(o,{normal:!0},c.a.createElement("h3",{style:{textAlign:"left"}},"Ahora reproduciendo:"),c.a.createElement(g,{name:f.name,artist:"".concat(f.artist," ")})),c.a.createElement(o,null,c.a.createElement("h2",null,"\xbfComo te quieres sentir ?"),c.a.createElement(p,{onClick:function(){return i(1)},state:!0}),c.a.createElement(p,{onClick:function(){return i(2)},state:!1})),c.a.createElement(D,{nowPlaying:f,state:r}))};Boolean("34.68.6.184"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[9,1,2]]]);
//# sourceMappingURL=main.604ae333.chunk.js.map