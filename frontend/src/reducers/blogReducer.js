const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_BLOG":
      return state;
    case "CREATE_BLOG_ERROR":
      return state;
    case "DELETE_BLOG":
      return state;
    case "DELETE_BLOG_ERROR":
      return state;
    case "UPDATE_BLOG":
      return state;
    case "UPDATE_BLOG_ERROR":
      return state;
    default:
      return state;
  }
};

export default blogReducer;
