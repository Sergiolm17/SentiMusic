(window.webpackJsonpapp=window.webpackJsonpapp||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(3),i=n.n(r),l=(n(10),n(1)),o=n(4),u=new(n.n(o).a);function s(){var e=E(),t=Object(a.useState)(!1),n=Object(l.a)(t,2),c=n[0],r=n[1];return Object(a.useEffect)(function(){e.access_token&&u.setAccessToken(e.access_token),r(!!e.access_token)},[e.access_token]),c}var m=function(){var e=s(),t=Object(a.useState)({}),n=Object(l.a)(t,2),c=n[0],r=n[1];return Object(a.useEffect)(function(){e&&u.getMe().then(function(e){console.log(e),r(e)})},[e]),[c]},d=function(e){var t=Object(a.useState)({name:"",albumArt:"",is_playing:!1,uri:"",id:""}),n=Object(l.a)(t,2),c=n[0],r=n[1],i=Object(a.useState)(!1),o=Object(l.a)(i,2),s=o[0],m=o[1];return Object(a.useEffect)(function(){n();var t=setInterval(function(){return e&&n()},5e3);function n(){e&&u.getMyCurrentPlaybackState().then(function(e){m(!!e&&e.is_playing),e&&r({name:e.item.name,albumArt:e.item.album.images[0].url,is_playing:e.is_playing,uri:e.item.uri,id:e.item.id})})}return function(){clearInterval(t)}},[e]),[c,s]},p=function(e){var t=Object(a.useState)([]),n=Object(l.a)(t,2),c=n[0],r=n[1];return Object(a.useEffect)(function(){e.id&&u.getMyDevices().then(function(e){return r(e.devices)})},[e.id]),[c]},f=function(e){var t=Object(a.useState)([]),n=Object(l.a)(t,2),c=n[0],r=n[1];return Object(a.useEffect)(function(){e.id&&u.getRecommendations({limit:4,market:"PE",seed_tracks:e.id}).then(function(e){return r(e.tracks)})},[e.id]),[c]},b=function(e){var t=Object(a.useState)({}),n=Object(l.a)(t,2),c=n[0],r=n[1];return Object(a.useEffect)(function(){e.id&&u.getAudioFeaturesForTrack(e.id).then(function(e){return r(e)})},[e.id]),[c]},E=function(){var e,t={},n=/([^&;=]+)=?([^&;]*)/g,a=window.location.hash.substring(1);for(e=n.exec(a);e;)t[e[1]]=decodeURIComponent(e[2]),e=n.exec(a);return t},g="https://sentimusic.herokuapp.com/login";var v=function(){var e=s(),t=m(),n=Object(l.a)(t,1)[0],a=d(e),r=Object(l.a)(a,2),i=r[0],o=r[1],u=p(i),E=Object(l.a)(u,1)[0],v=b(i),h=Object(l.a)(v,1)[0],j=f(i),O=Object(l.a)(j,1)[0];return c.a.createElement("div",null,!e&&c.a.createElement("a",{href:g}," Login to Spotify "),n.display_name&&"hola "+n.display_name,i.name&&o&&c.a.createElement("div",null,c.a.createElement("p",null,"Ahora reproduciendo: ",i.name),c.a.createElement("img",{alt:i.name,src:i.albumArt,style:{height:300}}),c.a.createElement("p",null,"acousticness- ",h.acousticness),c.a.createElement("p",null,"danceability- ",h.danceability),c.a.createElement("p",null,"duration_ms- ",h.duration_ms),c.a.createElement("p",null,"energy- ",h.energy),c.a.createElement("p",null,"instrumentalness- ",h.instrumentalness),c.a.createElement("p",null,"key- ",h.key),c.a.createElement("p",null,"liveness- ",h.liveness),c.a.createElement("p",null,"loudness- ",h.loudness),c.a.createElement("p",null,"duration_ms- ",h.duration_ms),c.a.createElement("p",null,"mode- ",h.mode),c.a.createElement("p",null,"speechiness- ",h.speechiness),c.a.createElement("p",null,"tempo- ",h.tempo),c.a.createElement("p",null,"time_signature- ",h.time_signature),c.a.createElement("p",null,"valence- ",h.valence)),c.a.createElement("p",null,E.length>0&&"se encontro "+E.length+" dispositivos",E.map(function(e){return c.a.createElement("li",{key:e.id},e.name," ",e.tylie)})),"Recomendaciones",O.map(function(e,t){return c.a.createElement("div",{key:e.id},c.a.createElement("p",null,e.artists[0].name,"-",e.name),c.a.createElement("img",{alt:e.name,src:e.album.images[0].url,style:{height:100}}),c.a.createElement("audio",{controls:!0,src:e.preview_url,preload:"none"},"Your browser does not support the",c.a.createElement("code",null,"audio")," element."))}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},5:function(e,t,n){e.exports=n(11)}},[[5,1,2]]]);
//# sourceMappingURL=main.84680553.chunk.js.map