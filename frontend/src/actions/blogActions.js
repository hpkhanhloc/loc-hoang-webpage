export const createBlog = (blog) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("blogs")
      .add({
        ...blog,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
        lastChanged: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_BLOG", blog });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "CREATE_BLOG_ERROR" }, err);
      });
  };
};

export const deleteBlog = (blogId) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("blogs")
      .doc(blogId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_BLOG", blogId });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "DELETE_BLOG_ERROR" }, err);
      });
  };
};

export const updateBlog = (blogId, editedBlog) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("blogs")
      .doc(blogId)
      .update({ ...editedBlog, lastChanged: new Date() })
      .then(() => {
        dispatch({ type: "UPDATE_BLOG", blogId });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "UPDATE_BLOG_ERROR" }, err);
      });
  };
};
