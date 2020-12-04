import { setAlert } from "./alertAction";

export const createContent = (cvObject) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("cv")
      .add({
        ...cvObject,
        authorId: authorId,
        createdAt: new Date(),
        lastChanged: new Date(),
      })
      .then(() => {
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: "Created content!",
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Create content failed: ${err}`,
          })
        );
      });
  };
};

export const updateContent = (contentId, editedContent) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("cv")
      .doc(contentId)
      .update({ ...editedContent, lastChanged: new Date() })
      .then(() => {
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: "Updated content!",
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Update content failed: ${err}`,
          })
        );
      });
  };
};
