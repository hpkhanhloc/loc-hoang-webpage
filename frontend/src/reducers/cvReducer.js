const cvReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_CONTENT":
      console.log("add a content");
      return state;
    case "CREATE_CONTENT_ERROR":
      console.log("Create content error", action.err);
      return state;
    case "UPDATE_CONTENT":
      console.log("update content", action.contentId);
      return state;
    case "UPDATE_CONTENT_ERROR":
      console.log("update content error", action.err);
      return state;
    default:
      return state;
  }
};

export default cvReducer;
