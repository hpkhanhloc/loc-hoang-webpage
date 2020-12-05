import { setAlert } from "./alertAction";

export const logIn = (credential) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(() => {
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: "Login success!",
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Login failed: ${err}`,
          })
        );
      });
  };
};

export const logOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(
          setAlert({
            alert: true,
            severity: "info",
            alertMessage: "Logout success!",
          })
        );
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((response) => {
        return firebase
          .firestore()
          .collection("users")
          .doc(response.user.uid)
          .set({
            email: newUser.email,
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            role: "viewer",
          })
          .then((res) => {
            dispatch(
              setAlert({
                alert: true,
                severity: "success",
                alertMessage: "Signup success! You can login now!",
              })
            );
          })
          .catch((err) => {
            dispatch(
              setAlert({
                alert: true,
                severity: "error",
                alertMessage: `Signup failed: ${err}`,
              })
            );
          });
      });
  };
};

export const updateUserInformation = (userId, editedInfo) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("users")
      .doc(userId)
      .update({
        ...editedInfo,
        initials: editedInfo.firstName[0] + editedInfo.lastName[0],
      })
      .then(() => {
        dispatch(
          setAlert({
            alert: true,
            severity: "success",
            alertMessage: "Updated user information!",
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            alert: true,
            severity: "error",
            alertMessage: `Update failed: ${err}`,
          })
        );
      });
  };
};
