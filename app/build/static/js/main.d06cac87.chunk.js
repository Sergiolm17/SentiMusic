(window.webpackJsonpapp=window.webpackJsonpapp||[]).push([[0],{147:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(7),i=a.n(c),o=(a(81),a(12)),l=(a(75),a(82),a(83),function(e){var t=e.children,a=e.normal;return r.a.createElement("div",{className:"card ".concat(a&&"normal")},t)}),s=(a(84),function(e){var t=e.children,a=e.href;return r.a.createElement("a",{href:a,className:"button-domo"},t)}),m=(a(85),function(e){var t=e.children;return r.a.createElement("h1",null,t)}),u={boxShadow:" 7px 7px 9px rgba(0, 0, 0, 0.2)",height:300},d=function(e){var t=e.nowPlaying;return r.a.createElement("img",{alt:t.name,src:t.albumArt,style:u})},p=a(66),f=a.n(p),E=a(67),v=a.n(E),g=(a(86),function(e){var t=e.state,a=e.onClick;return r.a.createElement("button",{className:"buttonStyle",onClick:a},r.a.createElement("img",{src:t?f.a:v.a,alt:t?"Happy":"Sad",className:"EmojiStyle"}))}),b=(a(87),{margin:"10px"}),h=function(e){var t=e.name,a=e.artist;return r.a.createElement("div",{style:b},r.a.createElement("h2",null,t," "),r.a.createElement("h3",null,a))},w=(a(88),function(e){var t=e.artist,a=e.name,n=e.src,c=e.preview_url;return r.a.createElement("div",{className:"list-container"},r.a.createElement("div",null,r.a.createElement("img",{alt:a,src:n,style:{height:"50px"}})),r.a.createElement("div",{className:"list-who"},r.a.createElement("span",{className:"list-name"},a),r.a.createElement("span",{className:"list-artist"},t)),r.a.createElement("audio",{controls:!0,src:c,preload:"none"},"Your browser does not support the",r.a.createElement("code",null,"audio")," element."))}),y=(a(89),a(68)),k=a.n(y),O=a(69),j=a.n(O),x=a(70),_=new(a.n(x).a);function S(){var e=C(),t=Object(n.useState)(!1),a=Object(o.a)(t,2),r=a[0],c=a[1];return Object(n.useEffect)(function(){e.access_token&&_.setAccessToken(e.access_token),c(!!e.access_token)},[e.access_token]),r}var N=function(e){var t=Object(n.useState)({name:"",artist:"",albumArt:"",is_playing:!1,uri:"",id:""}),a=Object(o.a)(t,2),r=a[0],c=a[1],i=Object(n.useState)(!1),l=Object(o.a)(i,2),s=l[0],m=l[1];return Object(n.useEffect)(function(){a();var t=setInterval(function(){return e&&a()},1e3);function a(){e&&_.getMyCurrentPlaybackState().then(function(e){m(!!e&&e.is_playing),e&&c({name:e.item.name,albumArt:e.item.album.images[0].url,is_playing:e.is_playing,uri:e.item.uri,id:e.item.id,artist:e.item.artists[0].name})})}return function(){clearInterval(t)}},[e]),[r,s]},A=function(e,t){var a=Object(n.useState)([]),r=Object(o.a)(a,2),c=r[0],i=r[1],l=Object(n.useState)(!1),s=Object(o.a)(l,2),m=s[0],u=s[1];return Object(n.useEffect)(function(){window.onerror=function(e,t,a){return console.log("Error occured: "+e),u(!0),!1},e.id&&_.getRecommendations({limit:4,market:"PE",seed_tracks:e.id,min_valence:t?.5:0,max_valence:t?1:.5}).then(function(e){u(!1),i(e.tracks)})},[e.id,t]),[c,m]},C=function(){var e,t={},a=/([^&;=]+)=?([^&;]*)/g,n=window.location.hash.substring(1);for(e=a.exec(n);e;)t[e[1]]=decodeURIComponent(e[2]),e=a.exec(n);return t},I=a(74),P=(a(36),a(146),I.a.Handle,"https://sentimusic.herokuapp.com/login"),H={margin:"20px"};var B=function(){var e=S(),t=N(e),a=Object(o.a)(t,2),c=a[0],i=a[1],u=Object(n.useState)(!0),p=Object(o.a)(u,2),f=p[0],E=p[1],v=A(c,f),b=Object(o.a)(v,2),y=b[0],O=b[1];return console.log(O),!e||O?r.a.createElement("div",{className:"App-header"},r.a.createElement(l,null,r.a.createElement("p",null,r.a.createElement("img",{src:k.a,alt:"texto",style:H})),r.a.createElement("p",null,r.a.createElement("img",{src:j.a,alt:"Logo Domo",style:H})),r.a.createElement(s,{href:P,style:H},"Iniciar sesion con spotify"))):r.a.createElement("div",{className:"App-header"},e&&r.a.createElement(m,null,"Ahora reproduciendo"),c.name&&!i&&r.a.createElement(l,{normal:!0},r.a.createElement("p",{className:"Title"},"Ponle play para recomendarte"),r.a.createElement(h,{name:c.name,artist:c.artist})),c.name&&i&&r.a.createElement(l,{normal:!0},r.a.createElement(d,{nowPlaying:c}),r.a.createElement(h,{name:c.name,artist:c.artist})),r.a.createElement(l,null,r.a.createElement(g,{onClick:function(){return E(!0)},state:!0}),r.a.createElement(g,{onClick:function(){return E(!1)},state:!1})),r.a.createElement(l,{normal:!0},y.map(function(e,t){return r.a.createElement(w,{key:e.id,artist:e.artists[0].name,name:e.name,src:e.album.images[0].url,preview_url:e.preview_url})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},66:function(e,t,a){e.exports=a.p+"static/media/Happy.d51ce461.svg"},67:function(e,t,a){e.exports=a.p+"static/media/Sad.28aa5087.svg"},68:function(e,t,a){e.exports=a.p+"static/media/DOMO.554d941c.svg"},69:function(e,t,a){e.exports=a.p+"static/media/Logo.75f61d59.svg"},76:function(e,t,a){e.exports=a(147)},81:function(e,t,a){},82:function(e,t,a){},83:function(e,t,a){},84:function(e,t,a){},85:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){}},[[76,1,2]]]);
//# sourceMappingURL=main.d06cac87.chunk.js.map