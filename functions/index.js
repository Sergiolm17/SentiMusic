const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
});
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const db = admin.firestore();
const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery();
const dataset = "DomoData";

const bq = bigquery.dataset(dataset);
const Login_table = bq.table("Login");
const SavedTracks_table = bq.table("Saved_Tracks");

var moment = require("moment");
require("moment/locale/es");
const SpotifyWebApi = require("spotify-web-api-node");

const Spotify = new SpotifyWebApi({
  clientId: functions.config().spotify.client_id,
  clientSecret: functions.config().spotify.client_secret,
  //redirectUri: `http://localhost:3000/popup.html`
  redirectUri: `https://${process.env.GCLOUD_PROJECT}.web.app/popup.html`
});

const OAUTH_SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "playlist-modify-private",
  "user-modify-playback-state",
  "user-library-read",
  "user-library-modify"
];
/**
 * Redirects the User to the Spotify authentication consent screen. Also the 'state' cookie is set for later state
 * verification.
 */
exports.redirect = functions.https.onRequest((req, res) => {
  cookieParser()(req, res, () => {
    const state = req.cookies.state || crypto.randomBytes(20).toString("hex");
    console.log("Setting verification state:", state);
    res.cookie("state", state.toString(), {
      //maxAge: 3600000,
      secure: true,
      httpOnly: true
    });
    const authorizeURL = Spotify.createAuthorizeURL(
      OAUTH_SCOPES,
      state.toString()
    );
    res.redirect(authorizeURL);
  });
});

/**
 * Exchanges a given Spotify auth code passed in the 'code' URL query parameter for a Firebase auth token.
 * The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
 * The Firebase custom auth token is sent back in a JSONP callback function with function name defined by the
 * 'callback' query parameter.
 */
exports.token = functions.https.onRequest((req, res) => {
  try {
    cookieParser()(req, res, () => {
      console.log("Received verification state:", req.cookies.state);
      console.log("Received state:", req.query.state);
      if (!req.cookies.state) {
        throw new Error(
          "State cookie not set or expired. Maybe you took too long to authorize. Please try again."
        );
      } else if (req.cookies.state !== req.query.state) {
        throw new Error("State validation failed");
      }
      console.log("Received auth code:", req.query.code);

      Spotify.authorizationCodeGrant(req.query.code, (error, data) => {
        if (error) {
          console.log(error);
          throw error;
        }
        console.log("Received Access Token:", data.body["access_token"]);
        Spotify.setAccessToken(data.body["access_token"]);

        Spotify.getMe(async (error, userResults) => {
          if (error) {
            throw error;
          }
          console.log("Auth code exchange result received:", userResults);
          // We have a Spotify access token and the user identity now.
          const accessToken = data.body["access_token"];
          const spotifyUserID = userResults.body["id"];
          const profilePic = userResults.body["images"][0];
          const userName = userResults.body["display_name"];
          const email = userResults.body["email"];

          // Create a Firebase account and get the Custom Auth Token.
          const firebaseToken = await createFirebaseAccount(
            spotifyUserID,
            userName,
            profilePic,
            email,
            accessToken
          );
          // Serve an HTML page that signs the user in and updates the user profile.
          res.jsonp({ token: firebaseToken });
        });
      });
    });
  } catch (error) {
    return res.jsonp({ error: error.toString });
  }
  return null;
});

/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 * Also saves the accessToken to the datastore at /spotifyAccessToken/$uid
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
async function createFirebaseAccount(
  spotifyID,
  displayName,
  photoURL,
  email,
  accessToken
) {
  // The UID we'll assign to the user.
  const uid = `spotify:${spotifyID}`;

  // Save the access token to the Firebase Realtime Database.
  const databaseTask = admin
    .database()
    .ref(`/spotifyAccessToken/${uid}`)
    .set(accessToken)
    .catch(e => console.log(e));
  // Create or update the user account.
  const userCreationTask = admin
    .auth()
    .updateUser(uid, {
      displayName: displayName,
      photoURL: photoURL,
      email: email,
      emailVerified: true
    })
    .catch(error => {
      // If user does not exists we create it.
      if (error.code === "auth/user-not-found") {
        return admin.auth().createUser({
          uid: uid,
          displayName: displayName,
          photoURL: photoURL,
          email: email,
          emailVerified: true
        });
      }
      throw error;
    });

  // Wait for all async tasks to complete, then generate and return a custom auth token.
  await Promise.all([userCreationTask, databaseTask]);
  // Create a Firebase custom auth token.
  const token = await admin.auth().createCustomToken(uid);
  console.log('Created Custom token for UID "', uid, '" Token:', token);
  return token;
}
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
