const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_BLOG":
      console.log("add a blog");
      return state;
    case "CREATE_BLOG_ERROR":
      console.log("Create blog error", action.err);
      return state;
    case "DELETE_BLOG":
      console.log("delete blog", action.blogId);
      return state;
    case "DELETE_BLOG_ERROR":
      console.log("delete blog error", action.err);
      return state;
    case "UPDATE_BLOG":
      console.log("update blog", action.blogId);
      return state;
    case "UPDATE_BLOG_ERROR":
      console.log("update blog error", action.err);
      return state;
    default:
      return state;
  }
};

export default blogReducer;
