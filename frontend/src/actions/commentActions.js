import { setAlert } from "./alertActions";

export const createComment = (comment) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const authorID = getState().firebase.auth.uid;
    firestore
      .collection("comments")
      .add({
        ...comment,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorID: authorID,
        like: 0,
        dislike: 0,
        createdAt: new Date(),
        lastChanged: new Date(),
      })
      .then(() => {
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: `Posted comment!`,
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Post comment failed: ${err}`,
          })
        );
      });
  };
};

export const deleteComment = (commentID) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("comments")
      .doc(commentID)
      .delete()
      .then(() => {
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: "Deleted comment!",
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Delete comment failed: ${err}`,
          })
        );
      });
  };
};

export const updateComment = (commentID, editedComment) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("comments")
      .doc(commentID)
      .update({ ...editedComment, lastChanged: new Date() })
      .then(() => {
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: "Updated comment!",
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Update comment failed: ${err}`,
          })
        );
      });
  };
};
