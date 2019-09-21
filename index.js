/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

var client_id = process.env.client_id; // Your client id
var client_secret = process.env.client_secret; // Your secret
const PORT = process.env.PORT || 4001;
const urllocal = "34.68.6.184";
const urlprod = "https://sentimusic.herokuapp.com";
const parceprod = (iftrue, iffalse) =>
  process.env.NODE_ENV === "production" ? iftrue : iffalse;

let typehttp = parceprod(["", ""], ["https://", "http://"]);
let appurl = parceprod(urlprod, urllocal);
let port = parceprod(["", ""], [":3000", ":" + PORT]);

var redirect_uri = typehttp[1] + appurl + port[1] + "/callback"; // Or Your redirect uri
var pageurl = typehttp[0] + appurl + port[0] + "/#";

var generateRandomString = length => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();
app.use(express.static(__dirname + "/app/build")).use(cookieParser());

var moment = require("moment");
require("moment/locale/es");
app.get("/playlist", function(req, res) {
  var userid = req.query.userid || null;
  var playlist = req.query.playlist || null;
  if (userid === null || playlist === null)
    sendDataSecundary(
      "https://us-central1-domo-music.cloudfunctions.net/loginUser",
      { id: userid, playlist },
      data => {
        console.log(data);
      }
    );
});

app.get("/login", function(req, res) {
  console.log("en login");

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    "user-read-private user-read-email user-read-playback-state playlist-modify-private user-modify-playback-state user-library-read";
  console.log(redirect_uri);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri,
        state: state
      })
  );
});

app.get("/callback", function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };
    var me_irl = "";
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;
        sendData(
          "https://api.spotify.com/v1/me",
          body.access_token,
          "https://us-central1-domo-music.cloudfunctions.net/loginUser",
          null,
          function(body) {},
          null,
          body => {
            res.cookie("me_id", body.id);
            sendDataSecundary(
              "https://us-central1-domo-music.cloudfunctions.net/getPlaylist",
              body,
              receive => {
                let parse = JSON.parse(receive);
                console.log(parse.id);
                res.cookie("playlist_id", parse.id);
                res.redirect(
                  pageurl +
                    querystring.stringify({
                      access_token: access_token,
                      refresh_token: refresh_token
                    })
                );
              }
            );
          }
        );
        /*
        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          //console.log(body);
        });
        sendData(
          "https://api.spotify.com/v1/me",
          access_token,
          "https://us-central1-domo-music.cloudfunctions.net/loginUser",
          null,
          function(body) {
            res.cookie("me_id", body.id);
    */
        /*
            
            sendData(
              "https://api.spotify.com/v1/me/tracks",
              access_token,
              "https://us-central1-domo-music.cloudfunctions.net/savedTracks",
              body
              );
            }
            );
            
            */
        // we can also pass the token to the browser to make requests from there
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        );
      }
    });
  }
});

function sendData(
  url,
  access_token,
  redirect,
  data,
  accion_after,
  query,
  data_pri
) {
  var options = {
    url: url + querystring.stringify(query),
    headers: {
      Authorization: "Bearer " + access_token
    },
    json: true
  };
  // use the access token to access the Spotify Web API
  request.get(options, function(error, response, body_pri) {
    data_pri(body_pri);
    request.post(
      {
        url: redirect,
        form: { ...body_pri, ...data }
      },
      function(error, response, body) {
        if (accion_after) accion_after(body);
      }
    );
  });
}
function sendDataSecundary(url, data, accion_after) {
  request.post(
    {
      url,
      form: data
    },
    (error, response, body) => {
      accion_after(body);
    }
  );
}
app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
