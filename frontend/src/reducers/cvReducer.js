const cvReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_CONTENT":
      return state;
    case "CREATE_CONTENT_ERROR":
      return state;
    case "UPDATE_CONTENT":
      return state;
    case "UPDATE_CONTENT_ERROR":
      return state;
    default:
      return state;
  }
};

export default cvReducer;
