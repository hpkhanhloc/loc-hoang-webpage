import authReducer from "./authReducer";
import blogReducer from "./blogReducer";
import cvReducer from "./cvReducer";
import videoReducer from "./videoReducer";
import alertReducer from "./alertReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  cv: cvReducer,
  video: videoReducer,
  alert: alertReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
