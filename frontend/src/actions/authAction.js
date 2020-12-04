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
