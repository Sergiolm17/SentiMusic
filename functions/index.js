const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery();
const dataset = "DomoData";

const bq = bigquery.dataset(dataset);
const Login_table = bq.table("Login");
const SavedTracks_table = bq.table("Saved_Tracks");

var moment = require("moment");
require("moment/locale/es");

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
