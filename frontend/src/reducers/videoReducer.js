const videoReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPLOAD_VIDEO":
      return state;
    case "UPLOAD_VIDEO_ERROR":
      return state;
    default:
      return state;
  }
};

export default videoReducer;
