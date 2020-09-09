export const createBlog = (blog) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("blogs")
      .add({
        ...blog,
        authorFirstName: "Loc",
        authorLastName: "Hoang",
        createdAt: new Date(),
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
