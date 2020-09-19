const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_BLOG":
      console.log("add a blog");
      return state;
    case "CREATE_BLOG_ERROR":
      console.log("Create blog error", action.err);
      return state;
    default:
      return state;
  }
};

export default blogReducer;
