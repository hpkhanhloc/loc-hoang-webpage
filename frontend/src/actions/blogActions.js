import { setAlert } from "./alertAction";

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
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: `Created blog ${blog.title}`,
          })
        );
      })
      .catch((err) => {
        dispatch({ type: "CREATE_BLOG_ERROR" }, err);
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Create blog failed: ${err}`,
          })
        );
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
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: "Deleted blog!",
          })
        );
      })
      .catch((err) => {
        dispatch({ type: "DELETE_BLOG_ERROR" }, err);
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Delete blog failed: ${err}`,
          })
        );
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
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: "Updated blog!",
          })
        );
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_BLOG_ERROR" }, err);
        setAlert({
          alert: true,
          severity: "error",
          alertMessage: `Update blog failed: ${err}`,
        });
      });
  };
};
