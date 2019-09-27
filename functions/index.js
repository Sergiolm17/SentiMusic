const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

var querystring = require("querystring");
var request = require("request"); // "Request" library

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery();
const dataset = "DomoData";

const bq = bigquery.dataset(dataset);
const Login_table = bq.table("Login");
const SavedTracks_table = bq.table("Saved_Tracks");
/*
var moment = require("moment");
require("moment/locale/es");
*/

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.loginUser = functions.https.onRequest((request, response) => {
  Login_table.insert({
    country: request.body.country,
    display_name: request.body.display_name,
    email: request.body.email,
    external_urls: request.body.external_urls.spotify,
    followers: request.body.followers.total,
    href: request.body.href,
    id: request.body.id,
    product: request.body.product,
    type: request.body.type,
    uri: request.body.uri,
    date: new Date()
  })
    .then(a => response.send(request.body))
    .catch(e => response.send(e));
});
exports.savedTracks = functions.https.onRequest((request, response) => {
  console.log(request.body);

  const parsedata = request.body.items.map(item => {
    return { ...item.track, added_at: item.added_at };
  });
  const alltrack = parsedata.map(track => {
    return {
      added_at: new Date(track.added_at),
      album: track.album.name,
      artists: track.artists[0].name,
      id: track.id,
      name: track.name,
      popularity: track.popularity,
      preview_url: track.preview_url,
      type: track.type,
      uri: track.uri,
      id_user: request.body.id
    };
  });

  SavedTracks_table.insert(alltrack)
    .then(a => response.send(request.body))
    .catch(e => response.send(e));
});
exports.getPlaylist = functions.https.onRequest((request, response) => {
  return db
    .collection("users")
    .doc(request.body.id)
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return response.send(doc.data());
      } else {
        // doc.data() will be undefined in this case
        return console.log("No such document!");
      }
    })
    .catch(error => {
      response.send(error);
    });
});
exports.setPlaylist = functions.https.onRequest((request, response) => {
  return db
    .collection("playlist")
    .doc(request.body.id)
    .set.set(
      {
        id: request.body.playlist
      },
      { merge: true }
    )
    .then(() => {
      return response.send(request.body);
    })
    .catch(error => {
      response.send(error);
    });
});
const urlprod = "https://us-central1-domo-music.cloudfunctions.net/app";
let client_id = "421d9717cc294f74881899835ef16862";
let client_secret = "1953a65ff5b94c968fe14b271b26cba2";
var redirect_uri = urlprod + "/callback"; // Or Your redirect uri
var pageurl = "https://domo-music.web.app" + "/#";
app.get("/login", (req, res) => {
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
app.get("/callback", (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  //var storedState = req.cookies ? req.cookies[stateKey] : null;
  console.log(state);

  if (state === null /* || state !== storedState*/) {
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
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;
        sendData(
          "https://api.spotify.com/v1/me",
          body.access_token,
          "https://us-central1-domo-music.cloudfunctions.net/loginUser",
          null,
          () => {},
          null,
          () => {}
        );

        redirect(res, access_token, refresh_token);

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
app.get("/refresh_token", (req, res) => {
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

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});
exports.app = functions.https.onRequest(app);

function redirect(res, access_token, refresh_token) {
  res.redirect(
    pageurl +
      querystring.stringify({
        access_token,
        refresh_token
      })
  );
}
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
  request.get(options, (error, response, body_pri) => {
    data_pri(body_pri, error);
    if (error) return false;
    request.post(
      {
        url: redirect,
        form: { ...body_pri, ...data }
      },
      (error, response, body) => {
        if (accion_after) accion_after(body, error);
      }
    );
  });
}
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
