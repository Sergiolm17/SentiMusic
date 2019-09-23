import firebase from "../Firebase";
const db = firebase.firestore();
function getUserData(user, returnUser) {
  if (user) {
    var docRef = db.collection("users").doc(user);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        returnUser(doc.data());
      } else {
        docRef.set({
          user
        });
        // doc.data() will be undefined in this case
        console.log("No such document!");
        returnUser(null, "No such document!");
      }
    });
  } else {
    returnUser(null, "No such user!");
  }
}
function updateData(user, data, functionReturn) {
  if (user) {
    var docRef = db.collection("users").doc(user);
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
  firebase
    .firestore()
    .collection("transition")
    .add({
      user,
      from,
      to,
      date: new Date()
    });
}
export { getUserData, updateData, PostAccion, PostTransition };
