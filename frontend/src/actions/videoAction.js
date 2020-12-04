import { setAlert } from "./alertAction";
export const createVideo = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("videos")
      .add({
        ...data,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
        lastChanged: new Date(),
      })
      .then(() => {
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: "Uploaded video",
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Upload video failed: ${err}`,
          })
        );
      });
  };
};
