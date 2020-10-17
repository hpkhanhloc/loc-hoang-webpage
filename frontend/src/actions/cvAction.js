export const createContent = (content) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("cv")
      .add({
        ...content,
        authorId: authorId,
        createdAt: new Date(),
        lastChanged: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_CONTENT", content });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "CREATE_CONTENT_ERROR" }, err);
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
        dispatch({ type: "UPDATE_CONTENT", contentId });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "UPDATE_CONTENT_ERROR" }, err);
      });
  };
};
