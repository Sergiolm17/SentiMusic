import firebase from "../Firebase";

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
export { PostAccion, PostTransition };
