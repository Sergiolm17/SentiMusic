const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery();
const dataset = "DomoData";

const bq = bigquery.dataset(dataset);
const Login_table = bq.table("Login");

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
    .then(a => response.send(a))
    .catch(e => response.send(e));
});
