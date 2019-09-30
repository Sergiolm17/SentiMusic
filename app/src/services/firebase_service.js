import firebase, { analytics } from "../Firebase";

const db = firebase.firestore();
function getUserData(user, returnUser) {
  if (user.id) {
    analytics.setUserId(user.id);
    var docRef = db.collection("users").doc(user.id);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        returnUser(doc.data());
        analytics.setCurrentScreen("hola");
      } else {
        docRef.set({
          ...user
        });
        // doc.data() will be undefined in this case
        console.log("No such document!");
        returnUser(user, "No such document!");
      }
    });
  } else {
    returnUser(null, "Not receive user");
  }
}
function updateData(user, data, functionReturn) {
  if (user) {
    console.log(user);

    var docRef = db.collection("users").doc(user.id);
    docRef
      .set(data, { merge: true })
      .then(() => {
        functionReturn(data);
      })
      .catch(function(error) {
        functionReturn(null, error);
      });
  } else {
    functionReturn(null, "No such user!");
  }
}
function PostAccion(user, accion) {
  firebase
    .firestore()
    .collection("actions")
    .add({
      user,
      accion,
      date: new Date()
    });
}
function PostTransition(user, from, to) {
  if (user.id){
    analytics.logEvent("post_accion", {
      user: user.id,
      from,
      to,
      date: new Date()
    });
    firebase
      .firestore()
      .collection("transition")
      .add({
        user: user.id,
        from,
        to,
        date: new Date()
      });
  }
    
}
export { getUserData, updateData, PostAccion, PostTransition };
