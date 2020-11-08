const videoReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPLOAD_VIDEO":
      console.log("upload a video");
      return state;
    case "UPLOAD_VIDEO_ERROR":
      console.log("Upload video error", action.err);
      return state;
    default:
      return state;
  }
};

export default videoReducer;
