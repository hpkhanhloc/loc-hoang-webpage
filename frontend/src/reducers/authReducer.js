const authReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return null;
    case "LOGIN_SUCCESS":
      return action.payload;
    case "LOGOUT_SUCCESS":
      return null;
    case "SIGNUP_SUCCESS":
      return action.payload;
    case "SIGNUP_ERROR":
      return null;
    default:
      return state;
  }
};

export default authReducer;
